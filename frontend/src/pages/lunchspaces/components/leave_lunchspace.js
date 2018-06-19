import apiFetch from '../../../lib/api_fetch'

export default function leaveLunchspace(subdomain, forceDelete) {
  return apiFetch('/api/lunchspace/leave', {
    method: 'DELETE',
    body: {
      subdomain,
      forceDelete,
    },
  })
}
