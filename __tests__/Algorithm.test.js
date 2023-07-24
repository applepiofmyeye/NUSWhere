import { findBestBusRoute , findBestShelteredRoute }  from "../app/firebase";

describe('findBestBusRoute', () => {
    it('Direct Route (short), No transfers', () => {
        const start = 'Kent Ridge MRT';
        const destination = 'Opp University Health Centre';
        const expectedRoute = ["Kent Ridge MRT", "LT27", "University Hall", "Opp University Health Centre"]
    
        const result = findBestBusRoute(start, destination).oldroute;
    
        expect(result).toEqual(expectedRoute);
    });

    it('Direct Route (long), No transfers', () => {
        const start = 'Opp Kent Ridge MRT';
        const destination = 'COM2';
        const expectedRoute = ["Opp Kent Ridge MRT", "PGP Residences", "TCOMS", "Opp HSSML", "Opp NUSS", "COM2"]
    
        const result = findBestBusRoute(start, destination).oldroute;
    
        expect(result).toEqual(expectedRoute);
    });

    it('Multiple Transfer Route Test 1', () => {
      const start = 'University Town';
      const destination = 'COM2';
      const expectedRoute = ["University Town", "YIH", "Central Library", "LT13", "AS5", "COM2"]
  
      const result = findBestBusRoute(start, destination).oldroute;
  
      expect(result).toEqual(expectedRoute);
    });

    it('Multiple Transfer Route Test 2', () => {
        const start = 'COM3';
        const destination = 'LT27';
        const expectedRoute = ["COM3", "Opp HSSML", "Opp NUSS", "COM2", "BIZ 2", "Opp PGP", "Kent Ridge MRT", "LT27"]
    
        const result = findBestBusRoute(start, destination).oldroute;
    
        expect(result).toEqual(expectedRoute);
    });

    it('Current busstop and busstop destination the same, no routes available', () => {
        const start = 'COM3';
        const destination = 'COM3';
        const expectedRoute = null;
    
        const result = findBestBusRoute(start, destination);
    
        expect(result).toEqual(expectedRoute);
    });
})

describe('findBestShelteredRoute', () => {
    it('Current location and destination the same', () => {
        const start = 'COM1-0212';
        const destination = 'COM1-0212';
        const expectedRoute = ["COM1"];
    
        const result = findBestShelteredRoute(start, destination);
    
        expect(result).toEqual(expectedRoute);
    });

    it('Current location building and destination building the same', () => {
        const start = 'COM1-0212';
        const destination = 'COM1-0216';
        const expectedRoute = ["COM1"]
    
        const result = findBestShelteredRoute(start, destination);
    
        expect(result).toEqual(expectedRoute);
    });

    it('Presence of sheltered walkways Test 1', () => {
      const start = 'COM1-0212';
      const destination = 'i3-0344';
      const expectedRoute = ["COM1", "COM2", "BIZ2", "I3"];
  
      const result = findBestShelteredRoute(start, destination);
  
      expect(result).toEqual(expectedRoute);
    });

    it('Presence of sheltered walkways Test 2', () => {
        const start = 'E4A-04-08';
        const destination = 'COM1-0212';
        const expectedRoute = ["E4A", "E4", "E5", "Central Library", "AS6", "COM1"];
    
        const result = findBestShelteredRoute(start, destination);
    
        expect(result).toEqual(expectedRoute);
    });

    it('Absence of sheltered walkways, one of the venues is standalone', () => {
        const start = 'Technology Centre for Offshore and Marine, Singapore';
        const destination = 'COM2';
        const expectedRoute = 1;
    
        const result = findBestShelteredRoute(start, destination);
    
        expect(result).toEqual(expectedRoute);
    });

    it('Absence of sheltered walkways even though there exists sheltered linkways to other buildings from current and destination locations', () => {
        const start = 'University Hall';
        const destination = 'E4A';
        const expectedRoute = 1;
    
        const result = findBestShelteredRoute(start, destination);
    
        expect(result).toEqual(expectedRoute);
    });
})

