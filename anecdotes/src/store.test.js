import { describe, it, expect, vi, beforeEach } from 'vitest'
import anecdoteService from './services/anecdotes'


vi.mock('./services/anecdotes', () => ({
  default: {
    getAll: vi.fn(),
    createAnecdote: vi.fn(),
    updateAnecdote: vi.fn(),
    deleteAnecdote: vi.fn(),
  }
}))

import useAnecdoteStore, { useAnecdotes, useAnecdoteActions, useNotication, useFilter } from './store'
import { renderHook, act } from '@testing-library/react'

beforeEach(() => {
  useAnecdoteStore.setState({
    anecdotes: [
      { id: '1', content: 'low votes', votes: 1 },
      { id: '2', content: 'high votes', votes: 10 },
      { id: '3', content: 'mid votes', votes: 5 },
    ],
    filter: '',
    notification: '',
  })
})

describe('anecdoteStore', () => {
  it('initialize loads anecdotes from service', async () => {
      const mockAnecdotes = [
        { id: '1', content: 'test anecdote 1', votes: 0 },
        { id: '2', content: 'test anecdote 2', votes: 0 },
      ]
      anecdoteService.getAll.mockResolvedValue(mockAnecdotes)
      const { result } = renderHook(() => useAnecdoteActions())
      await act(async () => {
        await result.current.initialize()
      })
      const { result: anecdotesResult } = renderHook(() => useAnecdotes())
      expect(anecdotesResult.current).toEqual(mockAnecdotes)
    })
  it('returns anecdotes sorted by votes, highest first', () => {
    const { result } = renderHook(() => useAnecdotes())
    const votes = result.current.map(a => a.votes)
    expect(votes).toEqual([10, 5, 1])
  })

})

describe('useAnecdotes filtering', () => {
  it('returns only anecdotes matching the filter, still sorted by votes', () => {
    useAnecdoteStore.setState({
      anecdotes: [
        { id: '1', content: 'react is fun', votes: 3 },
        { id: '2', content: 'redux is hard', votes: 5 },
        { id: '3', content: 'react is powerful', votes: 8 },
      ],
      filter: 'react',
      notification: '',
    })
    const { result } = renderHook(() => useAnecdotes())
    const contents = result.current.map(a => a.content)
    expect(contents).toEqual(['react is powerful', 'react is fun'])
  })

  it('returns all anecdotes when filter is empty', () => {
    useAnecdoteStore.setState({
      anecdotes: [
        { id: '1', content: 'react is fun', votes: 3 },
        { id: '2', content: 'redux is hard', votes: 5 },
      ],
      filter: '',
      notification: '',
    })
    const { result } = renderHook(() => useAnecdotes())
    expect(result.current).toHaveLength(2)
  })
})

describe('voting', () => {
  it('increases the vote count of the correct anecdote', async () => {
    const anecdote = { id: '1', content: 'test anecdote', votes: 3 }
    useAnecdoteStore.setState({
      anecdotes: [anecdote],
      filter: '',
      notification: '',
    })
    anecdoteService.updateAnecdote.mockResolvedValue({
      ...anecdote, votes: 4
    })
    const { result } = renderHook(() => useAnecdoteActions())
    await act(async () => {
      await result.current.votesIncrement('1')
    })
    expect(anecdoteService.updateAnecdote).toHaveBeenCalledWith(
      '1', { ...anecdote, votes: 4 }
    )
    const { result: anecdotesResult } = renderHook(() => useAnecdotes())
    const updated = anecdotesResult.current.find(a => a.id === '1')
    expect(updated.votes).toBe(4)
  })
})

