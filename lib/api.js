import qs from 'qs'

export function formatDate(dateString) {
  const date = new Date(dateString)
  const options = { year: 'numeric', month: 'short' }
  const formattedDate = date.toLocaleDateString('en-US', options)
  return formattedDate
}

export function getStrapiURL(path = '') {
  return `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${path}`
}

export async function fetchAPI(path, urlParamsObject = {}, options = {}) {
  try {
    // Merge default and user options
    const mergedOptions = {
      next: { revalidate: 60 },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
      },
      ...options,
    }

    // Build request URL
    const queryString = qs.stringify(urlParamsObject, {
      encodeValuesOnly: true,
      arrayFormat: 'brackets',
    })
    const requestUrl = `${getStrapiURL(
      `/api${path}${queryString ? `?${queryString}` : ''}`,
    )}`

    // Trigger API call
    console.log('[fetchAPI] GET', requestUrl)
    const response = await fetch(requestUrl, mergedOptions)
    const data = await response.json()

    if (!response.ok) {
      const status = response.status
      const message = data?.error?.message || 'Request failed'
      console.error('[fetchAPI] Error', status, message, data?.error)
      throw new Error(`Strapi request failed (${status}): ${message}`)
    }

    return data
  } catch (error) {
    console.error(error)
    throw new Error(
      `Please check if your server is running and you set all the required tokens.`,
    )
  }
}
