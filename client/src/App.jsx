import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Landing from "./pages/Landing.jsx";
import Footer from './pages/Footer.jsx';

import SignUpCan from './pages/candidate/SignUpCan.jsx';
import NavbarCan from './pages/candidate/NavbarCan.jsx';
import InJobs from "./pages/candidate/InJobs.jsx";
import ExJobs from './pages/candidate/ExJobs.jsx';
import AppliedJobs from './pages/candidate/AppliedJobs.jsx';
import InterviewsCan from './pages/candidate/InterviewsCan.jsx';

import SignUpRec from './pages/recruiter/SignUpRec.jsx';
import NavbarRec from './pages/recruiter/NavbarRec.jsx';
import AddJob from './pages/recruiter/AddJob.jsx';
import Applications from './pages/recruiter/Applications.jsx';
import InterviewsRec from './pages/recruiter/InterviewsRec.jsx';

import JobView from './components/JobView.jsx';
import CallView from './components/CallView.jsx';
import ApplicationView from './components/ApplicationView.jsx';

const router = createBrowserRouter([
  {
    path:"/",
    element: (
      <>
      <Landing/>
      <Footer/>
      </>
    )
  },
  {
    path: "/candidate/signUp",
    element: (
      <SignUpCan/>
    )
  },
  {
    path: "/recruiter/signUp",
    element: (
      <SignUpRec/>
    )
  },

  //candidate
  {
    path: "/candidate/injobs",
    element: (
      <>
      <div className='bg-black max-w-screen'>
        <NavbarCan/>
        <InJobs/>
      </div>
      </>
    )
  },
  {
    path: "/candidate/jobview/:id",
    element: (
      <>
      <div className='bg-black max-w-screen'>
        <JobView/>
      </div>
      </>
    )
  },
  {
    path: "/candidate/exjobs",
    element: (
      <>
      <div className='bg-black w-screen'>
        <NavbarCan/>
        <ExJobs/>
      </div>
      </>
    )
  },
  {
    path: "/candidate/appliedjobs",
    element: (
      <>
      <div className='flex flex-col bg-black'>
        <NavbarCan/>
        <main className='py-12'>
          <AppliedJobs/>
        </main>
      </div>
      </>
    )
  },
  {
    path: "/candidate/interviews",
    element: (
      <>
      <div className='bg-black w-screen'>
        <NavbarCan/>
        <InterviewsCan/>
      </div>
      </>
    )
  },
  {
    path: "/candidate/injob/:id",
    element: (
      <JobView/>
    )
  },
  {
    path: "/callview/:interviewId",
    element: (
      <CallView/>
    )
  },

  // recruiter
  {
    path: "/recruiter/addjob",
    element: (
      <div className='flex flex-col min-h-screen bg-black'>
      <NavbarRec/>
      <main className='py-15'>
        <AddJob/>
      </main>
      </div >
    )
  },
  {
    path: "/recruiter/interviews",
    element: (
      <div className='flex flex-col min-h-screen bg-black max-w-screen'>
      <NavbarRec/>
      <main className='py-15 '>
        <InterviewsRec/>
      </main>
      </div >
    )
  },
  {
    path: "/recruiter/applications",
    element: (
      <div className='flex flex-col bg-black'>
        <NavbarRec/>
        <main className='py-12'>
          <Applications/>
        </main>
      </div>
    )
  },
  {
    path: "/application/:id",
    element: (
      <ApplicationView/>
    )
  },
  {
    path: "/callview/:interviewId",
    element: (
      <>
      <CallView/>
      </>
    )
  },



])

function App() {

  return (
    <>
    <RouterProvider router={router}/>
    </>
  )
}

export default App
