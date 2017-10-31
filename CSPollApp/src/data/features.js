
const v2 = [
    'Generics',
    'Partial types',
    'Anonymous methods',
    'Nullable types',
    'Iterators',
    'Covariance and contravariance'
  ]
  
  const v3 = [
    'Auto implemented properties',
    'Anonymous types',
    'Query expressions',
    'Lambda expression',
    'Expression trees',
    'Extension methods'
  ]
  
  const v4 = [
    'Dynamic binding',
    'Named/optional arguments',
    'Generic covariant and contravariant',
    'Embedded interop types'
  ]
  
  const v5 = [
    'Asynchronous members',
    'Caller info attributes'
  ]
  
  const v6 = [
    'Static imports',
    'Exception filters',
    'Property initializers',
    'Expression bodied members',
    'Null propagator',
    'String interpolation',
    'nameof operator',
    'Dictionary initializer'
  ]

  
let toDragableItem = function(l, version){
    return l.map( (name,index) =>  {
      return {name, version, order: index, displayed: true}; 
    });
  } 
  
  const csharpVersions = [
    {
      version: 2,
      features: toDragableItem(v2, 2)
    },
    {
      version: 3,
      features: toDragableItem(v3, 3)
    },
      {
      version: 4,
      features: toDragableItem(v4, 4)
    },
      {
      version: 5,
      features: toDragableItem(v5, 5)
    },
      {
      version: 6,
      features: toDragableItem(v6, 6)
    },
  ]

export default csharpVersions