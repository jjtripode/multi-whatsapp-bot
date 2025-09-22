const formatTelephone = (phone: string) => {
    const digits = phone.split('@')[0].replace(/\D/g, '');
    
    const cleanNumber = digits.startsWith('0') ? digits.slice(1) : digits;
    
    const countryCode = cleanNumber.slice(0, 2);          
    const areaCode = cleanNumber.slice(2, 6);            
    const number = cleanNumber.slice(6);                 
    
    return `+${countryCode} (${areaCode}) ${number}`;
};

export { formatTelephone };