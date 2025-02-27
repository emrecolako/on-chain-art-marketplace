import React, { FC, useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Downshift from 'downshift'
import { useRouter } from 'next/router'
import setParams from 'lib/params'
import debounce from 'lodash.debounce'
import { FiSearch, FiXCircle } from 'react-icons/fi'
import { paths } from '@reservoir0x/reservoir-kit-client'

type SearchCollectionsAPISuccessResponse =
  paths['/search/collections/v1']['get']['responses']['200']['schema']

type Props = {
  communityId?: string
  collectionSetId?: string
  initialResults?: SearchCollectionsAPISuccessResponse
}

const PROXY_API_BASE = process.env.NEXT_PUBLIC_PROXY_API_BASE

const SearchCollections: FC<Props> = ({ communityId, collectionSetId, initialResults }) => {
  const router = useRouter()
  const [focused, setFocused] = useState<boolean>(false)
  const [results, setResults] = useState<SearchCollectionsAPISuccessResponse>(
    {}
  )

  function getHref(search?: string) {
    const pathname = `${PROXY_API_BASE}/search/collections/v1`

    const query: paths['/search/collections/v1']['get']['parameters']['query'] =
      {
        limit: 6,
      }

      if (collectionSetId && collectionSetId !== 'www' && collectionSetId !== 'localhost') {
        query.collectionsSetId = collectionSetId
      }

    if (communityId && communityId !== 'www' && communityId !== 'localhost') {
      query.community = communityId
    }

    if (search) query.name = search

    return setParams(pathname, query)
  }

  const [count, setCount] = useState(0)
  const countRef = useRef(count)
  countRef.current = count

  const debouncedSearch = useCallback(
    debounce(async (value) => {
      // Do not search empty string
      if (value === '') {
        setResults({})
        return
      }

      // Fetch new results
      setCount(countRef.current)

      const href = getHref(value)

      try {
        const res = await fetch(href)

        const data = (await res.json()) as SearchCollectionsAPISuccessResponse

        if (!data) throw new ReferenceError('Data does not exist.')

        setResults(data)
      } catch (err) {
        console.error(err)
      }
    }, 100),
    []
  )

  const isEmpty = results?.collections?.length === 0

  return (
    <Downshift
      onInputValueChange={(value) => debouncedSearch(value)}
      id="search-bar-downshift"
      onChange={(item) => item.id && router.push(`/collections/${item.id}`)}
      itemToString={(item) => (item ? item.name : '')}
    >
      {({
        getInputProps,
        getItemProps,
        getMenuProps,
        isOpen,
        highlightedIndex,
        inputValue,
        reset,
      }) => (
        <div
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="relative"
        >
          <FiSearch
            className={`absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-[#4b5563] dark:text-neutral-300 ${
              focused ? 'text-[#9CA3AF]' : ''
            }`}
          />
          <input
            type="text"
            tabIndex={-1}
            className="reservoir-label-l input-primary-outline w-full pl-9 dark:border-neutral-600 dark:bg-neutral-800 dark:text-white dark:ring-primary-900 dark:placeholder:text-neutral-400  dark:focus:ring-4 lg:w-[447px]"
            placeholder="Search for a collection"
            {...getInputProps()}
          />
          {typeof inputValue === 'string' && inputValue !== '' && (
            <button
              onClick={() => {
                reset()
                setFocused(false)
              }}
            >
              <FiXCircle className="absolute top-1/2 right-3 z-20 h-4 w-4 -translate-y-1/2 text-[#9CA3AF]" />
            </button>
          )}

          {(focused || isOpen) &&
            inputValue === '' &&
            initialResults?.collections &&
            initialResults?.collections.length > 0 && (
              <div
                className="absolute top-[50px] z-10 w-full divide-y-[1px] divide-[#D1D5DB] overflow-hidden rounded-[8px] border border-[#D1D5DB] bg-white dark:divide-neutral-600 dark:border-neutral-600 dark:bg-neutral-900"
                {...getMenuProps()}
              >
                {initialResults?.collections
                  .slice(0, 6)
                  .map((collection, index) => (
                    <Link
                      key={collection?.name}
                      href={`/collections/${collection?.collectionId}`}
                    >
                      <a
                        {...getItemProps({
                          key: collection?.name,
                          index,
                          item: collection,
                        })}
                        onClick={() => {
                          reset()
                          setFocused(false)
                        }}
                        className={`flex items-center p-4 hover:bg-[#F3F4F6] dark:hover:bg-neutral-600 ${
                          highlightedIndex === index
                            ? 'bg-[#F3F4F6] dark:bg-neutral-600'
                            : ''
                        }`}
                      >
                        <img
                          src={
                            collection?.image ??
                            'https://via.placeholder.com/30'
                          }
                          alt={`${collection?.name}'s logo.`}
                          className="h-9 w-9 overflow-hidden rounded-full"
                        />
                        <span className="reservoir-subtitle ml-2 dark:text-white">
                          {collection?.name}
                        </span>
                      </a>
                    </Link>
                  ))}
              </div>
            )}
          {(focused || isOpen) && inputValue !== '' && isEmpty && (
            <div
              className="absolute top-[50px] z-10 w-full divide-y-[1px] divide-[#D1D5DB] overflow-hidden rounded-[8px] border border-[#D1D5DB] bg-white dark:divide-neutral-600 dark:border-neutral-600 dark:bg-neutral-900"
              {...getMenuProps()}
            >
              <div className="flex items-center p-4">No collections found</div>
            </div>
          )}
          {(focused || isOpen) && inputValue !== '' && !isEmpty && (
            <div
              className="absolute top-[50px] z-10 w-full divide-y-[1px] divide-[#D1D5DB] overflow-hidden rounded-[8px] border border-[#D1D5DB] bg-white dark:divide-neutral-600 dark:border-neutral-600 dark:bg-neutral-900"
              {...getMenuProps()}
            >
              {results?.collections?.slice(0, 6).map((collection, index) => (
                <Link
                  key={collection?.name}
                  href={`/collections/${collection?.collectionId}`}
                >
                  <a
                    {...getItemProps({
                      key: collection?.name,
                      index,
                      item: collection,
                    })}
                    onClick={() => {
                      reset()
                      setFocused(false)
                    }}
                    className={`flex items-center p-4 hover:bg-[#F3F4F6] dark:hover:bg-neutral-600 ${
                      highlightedIndex === index
                        ? 'bg-[#F3F4F6] dark:bg-neutral-600'
                        : ''
                    }`}
                  >
                    <img
                      src={
                        collection?.image ?? 'https://via.placeholder.com/30'
                      }
                      alt={`${collection?.name}'s logo.`}
                      className="h-9 w-9 overflow-hidden rounded-full"
                    />
                    <span className="reservoir-subtitle ml-2 dark:text-white">
                      {collection?.name}
                    </span>
                  </a>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </Downshift>
  )
}

export default SearchCollections
