import { promises as fs } from 'fs'
import path from 'path'
import { Comment, Data, User } from "@/typescript/comment";

export class File {
  static async getAllData(): Promise<Data> {
    try {
      // Define the path to the JSON file
      const jsonDirectory = path.join(process.cwd(), 'public', 'data.json')
    
      // Read the existing data from the data.json file
      const readData = await fs.readFile(jsonDirectory, 'utf-8')
  
      return JSON.parse(readData)
    } catch (error) {
      console.log('CANNOT GET ALL DATA', error)
      throw error
    }
  }

  static async getScoresHash(): Promise<{ user_commentIds: Record<string, number> }> {
    // const filePath = path.resolve('./checkScore.text')
    const filePath = path.join(process.cwd(), 'public', 'checkScore.text')

    try {
      // Read the content of the file
      const fileContent = await fs.readFile(filePath, 'utf-8')

      // Evaluate the content as JavaScript code to get the objects
      const data = eval(`(() => { 
        ${fileContent};
        return { user_commentIds }
      })()`)

      return data 
    } catch (error) {
      console.log('CANNOT GET SCORES HASH', error)
      throw error
    }
  }

  static async saveScoreHash(hasTable: Record<string, number>) {
    try {
      // Define the path to the JSON file
      const filePath = path.join(process.cwd(), 'public', 'checkScore.text')

      // Convert the data to javascript code
      const data = `const user_commentIds = ${JSON.stringify(hasTable, null, 2)};`

      // Save the modified content back to the file
      await fs.writeFile(filePath, data, 'utf-8')
    } catch (error) {
      console.log('CANNOT SAVE SCORES HASH', error)
      throw error
    }
  }

  static async getAllComments(): Promise<Comment[]> {
    try {
      const data:Data = await this.getAllData()
      return data.comments
    } catch (error) {
      console.log('CANNOT GET ALL COMMENTS', error)
      throw error
    }
  }

  static async getUser(): Promise<User> {
    try {
      const data:Data = await this.getAllData()
      return data.currentUser
    } catch (error) {
      console.log('CANNOT GET USER', error)
      throw error
    }
  }

  static async addAllData(data: Data): Promise<void> {
    try {
      // Define the path to the JSON file
      const jsonDirectory = path.join(process.cwd(), 'public', 'data.json')
  
      // Write the updated data to the data.json file
      await fs.writeFile(jsonDirectory, JSON.stringify(data, null, 2))
    } catch (error) {
      console.log('CANNOT WRITE DATA', error)
      throw error
    }
  }


}