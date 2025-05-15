
// Get all doctors
export const getDoctors = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/doctors');
      if (!response.ok) {
        throw new Error('Failed to fetch doctors');
      }
      const data = await response.json();
      console.log('Doctors data from API:', data); // Check if data is returned
      return data;
    } catch (error) {
      console.error('Error fetching doctors:', error);
      throw error;
    }
  };