import React from 'react'
import Layout from '../components/Layout'
import PageTitle from '../components/PageTitle'
import ContactForm from '../components/ContactForm'
import SEO from '../components/SEO'

const Contact = ({ data }) => {
  return (
    <Layout>
      <SEO title="Contact" description="Contact description goes here" />
    </Layout>
  )
}

export default Contact
