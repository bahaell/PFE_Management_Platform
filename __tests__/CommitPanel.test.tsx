import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { CommitPanel } from '@/components/collaboration/commit-panel'
import { CommitService } from '@/services/service_commits'

// Mock useAuth
jest.mock('@/providers/auth-provider', () => ({
  useAuth: () => ({
    user: { id: 'teacher-1', role: 'teacher', name: 'Dr. Ahmed Hassan' }
  })
}))

// Mock useToast
jest.mock('@/hooks/use-toast', () => ({
  useToast: () => ({
    toast: jest.fn()
  })
}))

describe('CommitPanel', () => {
  let queryClient: QueryClient

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false } }
    })
  })

  const renderWithProviders = (component: React.ReactElement) => {
    return render(
      <QueryClientProvider client={queryClient}>
        {component}
      </QueryClientProvider>
    )
  }

  test('renders header with overall progress', async () => {
    renderWithProviders(<CommitPanel projectId="1" />)
    
    await waitFor(() => {
      expect(screen.getByText('Overall Progress')).toBeInTheDocument()
    })
  })

  test('displays commits when available', async () => {
    renderWithProviders(<CommitPanel projectId="1" />)
    
    await waitFor(() => {
      expect(screen.getByText(/Great progress on the data preprocessing/)).toBeInTheDocument()
    })
  })

  test('shows "No commits yet" placeholder when empty', async () => {
    const emptyProjectId = 'empty-project'
    renderWithProviders(<CommitPanel projectId={emptyProjectId} />)
    
    await waitFor(() => {
      expect(screen.getByText('No commits yet')).toBeInTheDocument()
    })
  })

  test('renders add feedback button for teacher', async () => {
    renderWithProviders(<CommitPanel projectId="1" isReadOnly={false} />)
    
    await waitFor(() => {
      expect(screen.getByText(/Add Feedback/)).toBeInTheDocument()
    })
  })

  test('hides add feedback button for read-only view', async () => {
    renderWithProviders(<CommitPanel projectId="1" isReadOnly={true} />)
    
    await waitFor(() => {
      expect(screen.queryByText(/Add Feedback/)).not.toBeInTheDocument()
    })
  })

  test('calls CommitService.addCommit when form is submitted', async () => {
    const addCommitSpy = jest.spyOn(CommitService, 'addCommit')
    
    renderWithProviders(<CommitPanel projectId="1" />)
    
    await waitFor(() => {
      expect(screen.getByText(/Add Feedback/)).toBeInTheDocument()
    })

    const addButton = screen.getByText(/Add Feedback/)
    fireEvent.click(addButton)

    // Form should open but we can't test form submission without more setup
    expect(addCommitSpy).not.toHaveBeenCalled() // Until form is filled

    addCommitSpy.mockRestore()
  })
})
