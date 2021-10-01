const { ApolloServer, gql } = require('apollo-server');
const mongoCollections = require('./config/mongoCollections');
const lodash = require('lodash');
const uuid = require('uuid');//for generating id's

//Some Mock Data
const employeeCollection = mongoCollections.employees;
const employerCollection = mongoCollections.employers;

//Create the type definitions for the query and our data
const typeDefs = gql`
  type Query {
    employers: [Employer]
    employees: [Employee]
    employer(id: Int): Employer
    employee(id: String): Employee
  }

  type Employer {
    id: Int
    name: String
    employees: [Employee]
    numOfEmployees: Int
  }

  type Employee {
    id: String
    firstName: String
    lastName: String
    employer: Employer
  }

  type Mutation {
    addEmployee(
      firstName: String!
      lastName: String!
      employerId: Int!
    ): Employee
    removeEmployee(id: String!): Employee
    editEmployee(
      id: String!
      firstName: String
      lastName: String
      employerId: Int
    ): Employee
    addEmployer(name: String!): Employer
  }
`;

/* parentValue - References the type def that called it
    so for example when we execute numOfEmployees we can reference
    the parent's properties with the parentValue Paramater
*/

/* args - Used for passing any arguments in from the client
    for example, when we call 
    addEmployee(firstName: String!, lastName: String!, employerId: Int!): Employee
		
*/

const resolvers = {
  Query: {
    employer: (_, args) => {
      return employerCollection().then((employers) => 
        employers.findOne({id: args.id}));
    },
    employee: (_, args) => {
      return employeeCollection().then((employees) => 
        employees.findOne({id: args.id}));
    },
    employers: () => {
      return employerCollection().then((employers) => 
        employers.find({}).toArray());
    },
    employees: () => {
      return employeeCollection().then((employees) => 
        employees.find({}).toArray());
    }
  },
  Employer: {
    numOfEmployees: (parentValue) => {
      console.log(`parentValue in Employer`, parentValue);
      return employeeCollection().then((employees) => 
        employees.count( { employerId: parentValue.id } ));
    },
    employees: (parentValue) => {
      return employeeCollection().then((employees) => 
        employees.find( { employerId: parentValue.id } ).toArray());
    }
  },
  Employee: {
    employer: (parentValue) => {
      return employerCollection().then((employers) => 
        employers.findOne( { id: parentValue.employerId } ));
    }
  },
  Mutation: {
    addEmployee:  (_, args) => {
      const newEmployee = {
        id: uuid.v4(),
        firstName: args.firstName,
        lastName: args.lastName,
        employerId: args.employerId
      };
      return employeeCollection().then((employees) => {
        employees.insertOne(newEmployee);
        return newEmployee;
      });
    },
    removeEmployee: (_, args) => {
      return employeeCollection().then((employees) => 
        employees.findOne({id: args.id}).then((oldEmployee) => {
        console.log("Removing Employee: "+ JSON.stringify(oldEmployee));
        employees.removeOne({id: args.id})
        return oldEmployee;
         })
      );
    },
    editEmployee: async (_, args) => {
      return employeeCollection().then((employees) =>
        employees.findOne({id: args.id}).then((newEmployee) => {
          if(newEmployee){
              if( args.firstName ){
                newEmployee.firstName = args.firstName;
              }
              if( args.lastName ){
                newEmployee.lastName = args.lastName;
              }
              if( args.employerId ){
                employerCollection().then((employers) =>
                  employers.count({}).then((employerCount) => {
                    if(employerCount+1 >= args.employerId){
                      newEmployee.employerId = args.employerId;
                    }
                  }))
              }
              return employees.updateOne({id: args.id}, {$set: newEmployee}).then(() => newEmployee);
            }
            return newEmployee;
        })

      );
    },
    addEmployer: (_, args) => {
      return employerCollection().then((employers) => 
        employers.count({}).then((employerCount) => {
          const newEmployer = {
            id: employerCount + 1,
            name: args.name
          }
          employers.insertOne(newEmployer)
          return newEmployer;
        })
      );
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url} 🚀`);
});
