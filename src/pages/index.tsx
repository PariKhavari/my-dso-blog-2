import React, { type ReactNode } from 'react';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import Header from '../components/header';
import Hero from '../components/hero';
import Skills from '../components/skills';
import Projects from '../components/projects';
import Contact from '../components/contact';
import Footer from '../components/footer';

export default function Home(): ReactNode {
  return (
    <Layout title="" description="DevSecOps portfolio" noFooter>
      <Head>
        <style>{`.navbar { display: none !important; }`}</style>
      </Head>
      <Header />
      <main>
        <Hero />
        <Skills />
        <Projects />
        <Contact />
        <Footer />
      </main>
    </Layout>
  );
}
