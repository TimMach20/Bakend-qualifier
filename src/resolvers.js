import * as Query from './resolvers/Query.js'
import * as Mutation from './resolvers/Mutation.js'
import * as Country from './countries/Country.js'
import * as User from './user/User.js'
import * as UserProfile from './user/UserProfile.js'
import * as Teacher from './teacher/Teacher.js'
import * as AcademicMatters from './teacher/AcademicMatters.js'

export const resolvers = {
  Query,
  Mutation,
  Country,
  User,
  UserProfile,
  Teacher,
  AcademicMatters
}
