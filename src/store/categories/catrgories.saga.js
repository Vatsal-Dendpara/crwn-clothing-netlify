import { put, takeLatest, all, call } from "redux-saga/effects";
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.util";
import {
  fetchCategoriesFailed,
  fetchCategoriesSuccess,
} from "./categories.action";
import { CATEGORIES_ACTION_TYPES } from "./categories.types";
export function* fetchCategoriesAsync() {
  try {
    const categoryArray = yield call(getCategoriesAndDocuments);
    yield put(fetchCategoriesSuccess(categoryArray));
  } catch (error) {
    yield put(fetchCategoriesFailed(error));
  }
}

export function* onFetchCategories() {
  yield takeLatest(
    CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START,
    fetchCategoriesAsync
  );
}

export function* categoriesSaga() {
  yield all([call(onFetchCategories)]);
}
