const API_BASE_URL = "http://118.69.170.50/API"

export interface LoginParams {
  username: string
  password: string
  companyID: string
  Lag?: string
}

export interface LoginResponse {
  access_token?: string
  message?: string
  // Add other response fields as needed
}

/**
 * Login function that authenticates user and returns token
 * @param credentials - User login credentials
 * @returns Promise with login response
 */
export async function login({ username, password, companyID, Lag = "VIET" }: LoginParams) {
  const response = await fetch(`${API_BASE_URL}/api/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password, companyID, Lag }),
  })
  const data: LoginResponse = await response.json()
  return { ok: response.ok, data }
}

/**
 * Logout function that calls API to invalidate token
 * @returns Promise with logout response
 */
export async function logout() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
    const data = await response.json()
    return { ok: response.ok, data }
  } catch (error) {
    console.error("Logout error:", error)
    return { ok: false, data: null }
  }
}