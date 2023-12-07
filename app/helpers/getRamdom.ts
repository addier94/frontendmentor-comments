const timeUnits = ['day ago', 'week ago', 'month ago']

const random = {
  getRandomNumberInRange: (min:number, max:number) => {
    // Generate a random decimal number between 0 (inclusive) and 1 (exclusive)
    const randomDecimal = Math.random();

    // Calculate the range of numbers we want to generate
    const range = max - min + 1;

    // Scale the random decimal number to our desired range
    const randomInRange = randomDecimal * range;

    // Shift the range of numbers so that it starts from min instead of 0
    const shiftedNumber = randomInRange + min;

    // Round down the result to the nearest whole number
    const randomInteger = Math.floor(shiftedNumber);

    // Return the random integer
    return randomInteger;
  },

  getRandomTime: ():string => {
    const randomNum = Math.floor(Math.random() * 3)
    switch (randomNum) {
      case 0:
        const days = random.getRandomNumberInRange(1, 7) 
        const dayString = days > 1 ? 'days ago' : 'day ago'
        return `${days} ${dayString}`
      case 1:
        const weeks = random.getRandomNumberInRange(1, 4)
        const weekString = weeks > 1 ? 'weeks ago' : 'week ago'
        return `${weeks} ${weekString}`
      case 2:
        const months = random.getRandomNumberInRange(1, 12)
        const monthString = months > 1 ? 'months ago' : 'month ago'
        return `${months} ${monthString}`
      default:
        const years = random.getRandomNumberInRange(1, 10)
        const yearString = years > 1 ? 'years ago' : 'year ago'
        return `${years} ${yearString}`
    }
  }, 

  getRandomId: ():string => {
    // Generate a random decimal number between 0 and 1 using Math.random()
    const randomIdPart1 = Math.random().toString(36).substring(2, 15);
    
    // Generate another random decimal number between 0 and 1
    const randomIdPart2 = Math.random().toString(36).substring(2, 15);
    
    // Concatenate the two random parts to create a longer string
    const randomId = randomIdPart1 + randomIdPart2;

    // Return the generated random ID
    return randomId;
  },
}

export default random;