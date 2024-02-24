import { Route, Routes } from 'react-router-dom'
import './App.css'
import DefaultLayout from './containers/default/DefaultLayout'
import CategoryListPage from './category/list/CategoryListPage'
import CategoryCreatePage from './category/create/CategoryCreatePage'
import CategoryEditPage from './category/edit/CategoryEditPage'

function App() {

  return (
    <>
      <Routes>
        <Route path={"/"} element={<DefaultLayout />}>
          <Route index element={<CategoryListPage />} />
          <Route path='category'>
            <Route path='create' element={<CategoryCreatePage />} />
            <Route path='edit/:id' element={<CategoryEditPage />} />
          </Route>
        </Route>
      </Routes>
    </>
  )
}

export default App
