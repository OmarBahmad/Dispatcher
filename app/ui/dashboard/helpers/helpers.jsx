export const formattedDate = (date, format = "full") => {
  const newDate = new Date(date);

  if (format === "full") {
    // Retorna o formato completo: MM/DD/AAAA
    return newDate.toLocaleString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
  } else if (format === "partial") {
    // Retorna o formato parcial: MM/DD
    return newDate.toLocaleString('en-US', { month: '2-digit', day: '2-digit' });
  }
};

export const fetchPDFs = async (clientId) => {
  try {
    const response = await fetch(`/api/pdf/find?clientId=${clientId}`);
    if (!response.ok) throw new Error("Failed to fetch PDFs");
    return await response.json();
  } catch (error) {
    console.error("Error fetching PDFs:", error);
    return [];
  }
};