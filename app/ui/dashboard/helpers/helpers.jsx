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