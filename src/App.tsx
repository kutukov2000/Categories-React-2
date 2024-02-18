import { Route, Routes } from 'react-router-dom'
import './App.css'
import DefaultLayout from './containers/default/DefaultLayout'
import CategoryListPage from './category/list/CategoryListPage'
import CategoryCreatePage from './category/create/CategoryCreatePage'

function App() {

  return (
    <>
      <Routes>
        <Route path={"/"} element={<DefaultLayout />}>
          <Route index element={<CategoryListPage />} />
          <Route path='category'>
            <Route path='create' element={<CategoryCreatePage />} />
          </Route>
        </Route>
      </Routes>
    </>
  )
}

export default App
