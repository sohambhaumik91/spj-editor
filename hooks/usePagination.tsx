import fetcher from '@utils/fetcher';
import { useRouter } from 'next/router';
import { useEffect, useReducer, useState } from 'react';

const initialState = {
  list: {
    '0': [],
  },
  currentPage: 0,
  isFetching: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TO_LIST': {
      const { payload: { data, currentPage = 0 } = [] } = action;
      return {
        ...state,
        list: {
          ...state.list,
          [currentPage]: data,
        },
      };
    }
    case 'SET_LOADING': {
      return {
        ...state,
        isFetching: !state.isFetching,
      };
    }
    case 'UPDATE_CURRENT_PAGE': {
      const { payload } = action;
      return {
        ...state,
        currentPage: payload,
      };
    }
  }
  return {
    ...state,
  };
};

const fetchMoreData = async (api, skip, limit) => {
  // TODO: Change var names
  const { url, method, payload } = api;

  const queryParam = `?limit=${limit}&skip=${skip}`;
  const endPoint = `${url}${queryParam}`;

  try {
    const res = await fetcher({ endPoint, method, ...(method === 'POST' && { body: { ...payload } }) });
    const {
      data: { list = [] },
      statusCode,
    } = res;
    if (statusCode <= 301) {
      return list;
    } else {
      throw new Error();
    }
  } catch (e) {
    throw new Error();
  }
};

const usePagination = (api, initialData, totalRecords, paginationButtonCount, pageSize) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [currentBtnWindow, setCurrentBtnWindow] = useState([]);

  const router = useRouter();

  const { isFetching, currentPage, list } = state;

  useEffect(() => {
    if (initialData && initialData?.length) {
      dispatch({ type: 'ADD_TO_LIST', payload: { data: initialData } });
    }
  }, [initialData]);

  const paginationBtnNav = (buttonIndex) => {
    // button click updates router only
    const currentQueryParam = router.query;
    router.push(
      {
        pathname: router.pathname,
        query: { ...currentQueryParam, page: parseInt(buttonIndex, 10) + 1 },
      },
      undefined,
      { shallow: true }
    );
  };

  //read query params
  useEffect(() => {
    const { query: { page = 0 } } = router;
    const stepNumber = parseInt(page as string, 10) - 1;
    dispatch({ type: 'UPDATE_CURRENT_PAGE', payload: Math.max(stepNumber, 0) });
  }, [router]);

  useEffect(() => {
    async function fetchData(...args) {
      const newData = await fetchMoreData.apply(null, [...args]);
      dispatch({ type: 'ADD_TO_LIST', payload: { data: newData, currentPage } });
      dispatch({ type: 'SET_LOADING' });
    }

    if (!(state.currentPage === 0 && initialData && initialData.length)) {
      const dataAtIndex = list[currentPage];
      if (!dataAtIndex || dataAtIndex?.length !== pageSize) {
        dispatch({ type: 'SET_LOADING' });
        fetchData(api, currentPage * pageSize, pageSize);
      }
    }
    //calculate max buttons to show
  }, [state.currentPage]);


  useEffect(() => {
    const numOfPages = Math.ceil(totalRecords / pageSize);
    let maxLeft = state.currentPage - Math.floor(paginationButtonCount / 2);
    let maxRight = currentPage + Math.floor(paginationButtonCount / 2);

    if (maxLeft < 0) {
      maxLeft = 0;
      maxRight = paginationButtonCount - 1;
    }
    if (maxRight > numOfPages) {
      maxLeft = numOfPages - (paginationButtonCount - 1);
      maxRight = numOfPages;
      if (maxLeft < 0) {
        maxLeft = 0;
      }
    }
    const btns = [];

    const doesMoreDataExist = list[currentPage]?.length && list[currentPage]?.length === pageSize;

    btns.push({
      index: currentPage - 1,
      label: 'Prev',
      onClick: paginationBtnNav,
      disabled: currentPage === 0,
    });
    for (let i = maxLeft; i <= maxRight; i++) {
      btns.push({
        index: i,
        onClick: paginationBtnNav,
        label: i + 1,
        active: state.currentPage === i,
        disabled: i > currentPage && !doesMoreDataExist
      });
    }

    btns.push({
      index: currentPage + 1,
      label: 'Next',
      onClick: paginationBtnNav,
      disabled: maxRight === numOfPages || !doesMoreDataExist,
    });

    setCurrentBtnWindow(btns);
  }, [currentPage, list])


  return {
    isFetching,
    buttons: currentBtnWindow,
    currentRenderList: state?.list[currentPage] || [],
  };
};

export default usePagination;
