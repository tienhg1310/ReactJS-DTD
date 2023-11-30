import AddStaff from 'components/AddStaff'
import StaffItem from 'components/StaffItem'
import StaffList from 'components/StaffList'
import MainLayout from 'layouts/MainLayout'
import About from 'pages/About'
import Dashboard from 'pages/Dashboard'
import NotFound from 'pages/NotFound'
import Staff from 'pages/Staff'
import { Routes, Route, useRoutes, useLocation, useSearchParams } from 'react-router-dom'

function App() {
  const elements = useRoutes([
    { path: '/', element: <Dashboard /> },
    { path: '/about', element: <About /> },
    {
      path: '/staff',
      element: <Staff />,
      children: [
        { path: '', element: <StaffList /> },
        { path: ':id', element: <StaffItem /> },
        { path: 'add', element: <AddStaff /> }
      ]
    },
    { path: '*', element: <NotFound /> }
  ])

  return (
    <div className='App'>
      <MainLayout>
        {elements}
        {/* <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/about' element={<About />} />
          <Route path='/staff' element={<Staff />}>
            <Route index element={<StaffList />} />
            <Route path=':id' element={<StaffItem />} />
            <Route path='add' element={<AddStaff />} />
          </Route>
          <Route path='*' element={<NotFound />} />
        </Routes> */}
      </MainLayout>
    </div>
  )
}

export default App
