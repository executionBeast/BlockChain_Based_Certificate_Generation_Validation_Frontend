import React, { useState } from 'react';

const TestIssuerDashboard = () => {
  const [courseName, setCourseName] = useState('');
  const [certificateType, setCertificateType] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Course Created:', { courseName, certificateType });
    // Add your logic for course creation here
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>BCertify</h1>
        <span style={styles.dashboard}>Dashboard</span>
        <a href="/login" style={styles.login}>Login</a>
      </header>

      <nav style={styles.nav}>
        <button style={styles.navButton}>View Student</button>
        <button style={styles.navButton}>Create Course</button>
        <button style={styles.navButton}>Issue Certificates</button>
      </nav>

      <section style={styles.mainSection}>
        <h2>All Students</h2>
        <div style={styles.studentList}>
          {/* Placeholder for student data */}
        </div>
      </section>

      <section style={styles.formSection}>
        <h3>Create Course</h3>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            placeholder="Course Name"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            style={styles.input}
          />
          <select
            value={certificateType}
            onChange={(e) => setCertificateType(e.target.value)}
            style={styles.select}
          >
            <option value="">Certificate Type</option>
            <option value="Completion">Completion</option>
            <option value="Participation">Participation</option>
            <option value="Excellence">Excellence</option>
          </select>
          <button type="submit" style={styles.submitButton}>Submit</button>
        </form>
      </section>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    padding: '20px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #ccc',
    paddingBottom: '10px',
  },
  title: {
    fontSize: '24px',
    margin: 0,
  },
  dashboard: {
    fontSize: '18px',
    color: '#555',
  },
  login: {
    color: 'red',
    textDecoration: 'none',
  },
  nav: {
    display: 'flex',
    justifyContent: 'space-around',
    marginTop: '10px',
    marginBottom: '20px',
  },
  navButton: {
    padding: '10px 20px',
    border: 'none',
    background: '#f0f0f0',
    cursor: 'pointer',
  },
  mainSection: {
    marginBottom: '20px',
  },
  studentList: {
    height: '150px',
    background: '#e0e0e0',
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
  formSection: {
    borderTop: '1px solid #ccc',
    paddingTop: '10px',
  },
  form: {
    display: 'flex',
    gap: '10px',
  },
  input: {
    flex: 1,
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
  select: {
    flex: 1,
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
  submitButton: {
    background: '#ffa500',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default TestIssuerDashboard;
