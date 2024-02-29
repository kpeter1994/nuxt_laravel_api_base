import type {UseFetchOptions} from "#app";
import {useRequestHeaders} from "nuxt/app";

export function useApiFetch<T> (path: string, options: UseFetchOptions<T> = {}) {
  const config = useRuntimeConfig();

  let headers: any = {
      accept: 'application/json',
      referer: config.public.appUrl
  };

  const token = useCookie('XSRF-TOKEN');

  if (token.value) {
    headers['X-XSRF-TOKEN'] = token.value as string;
  }

  if (process.server) {
      headers = {
            ...headers,
            ...useRequestHeaders(['referer', 'cookie'])
      }
  }


  return  useFetch(config.public.apiBaseUrl + path, {
    credentials: 'include',
    ...options,
    watch: false,
    headers : {
        ...headers,
        ...options.headers
    }
  })

}
