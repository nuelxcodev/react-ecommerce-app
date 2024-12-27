export function checkexpiredOTP(data) {
  const currentTime = Date.now(); 
  const expiresAt = new Date(data.expiresAt).getTime(); 
  return currentTime > expiresAt;
}
