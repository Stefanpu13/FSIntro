const featuresInfo = {
'Generics':{
    info: `
    // class/method that receives type paramater - "T" - 
    // is generic
    public class Stack<T>
    {       
    public void Push(T item)
    {...}
    public T Pop()
    {...}
    }
    ...
    Stack<int> stack = new Stack<int>();
    stack.Push(1);
    stack.Push(2);
    int number = stack.Pop();        
            `,
    moreInfo: 'https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/generics/'
},
'Partial types':{
    info:
    `
    public partial class Employee
    {
        public void DoWork()
        {
        }
    }

    public partial class Employee
    {
        public void GoToLunch()
        {
        }
    }
    `,
    moreInfo: 'https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/classes-and-structs/partial-classes-and-methods#partial-classes'
},
'Anonymous methods':{
    info:
    `
    // Anonymous method through delegate.
    // Create a handler for a click event.
    button1.Click += 
        delegate(System.Object o, System.EventArgs e)
        { System.Windows.Forms.MessageBox.Show("Click!"); };
    `,
    moreInfo:'https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/statements-expressions-operators/anonymous-methods'
},
'Nullable types':{
    info:
    `   
    // The '?' creates Nullable type
    int? num = null;
    `,
    moreInfo:'https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/nullable-types/index'
},
'Iterators': {
    info:
    `
    static void Main()  
    {   
        You consume an iterator by using a foreach or LINQ query.
        foreach (int number in SomeNumbers())  
        {  
            Console.Write(number.ToString() + " ");  
        }  
        // Output: 3 5 8  
        Console.ReadKey();  
    }  
    
    // Iterator
    public static System.Collections.IEnumerable SomeNumbers()  
    {  
        // use 'yield' to return each elem, on at a time   
        yield return 3;  
        yield return 5;  
        yield return 8;  
    }  
    `,
    moreInfo: 'https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/concepts/iterators'
},
'Covariance and contravariance':{
    info:
    `
    // Covariance.
    IEnumerable<string> strings = new List<string>();  
    // An object that is instantiated with a more derived type argument   
    // is assigned to an object instantiated with a less derived type argument.   
    // Assignment compatibility is preserved.   
    IEnumerable<object> objects = strings; 

    object[] array = new String[10];  
    // The following statement produces a run-time exception.  
    array[0] = 10;  

    // ------------- Contravariance. ---------------

    // Contravariance.             
    // Assume that the following method is in the class:   
    // static void SetObject(object o) { }   
    Action<object> actObject = SetObject;  
    // An object that is instantiated with a less derived type argument   
    // is assigned to an object instantiated with a more derived type argument.   
    // Assignment compatibility is reversed.   
    Action<string> actString = actObject; 
    `,
    moreInfo:'https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/concepts/covariance-contravariance/index'    
},
'Auto implemented properties':{
    info:
    `
    // Auto-Impl Properties for trivial get and set
    public double TotalPurchases { get; set; }
    public string Name { get; set; }
    public int CustomerID { get; set; }
    `,
    moreInfo:'https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/classes-and-structs/auto-implemented-properties'
},
'Anonymous types':{
    info:
    `
    // no class declaration
    var v = new { Amount = 108, Message = "Hello" };  
    
    // Rest the mouse pointer over v.Amount and v.Message in the following  
    // statement to verify that their inferred types are int and string.  
    Console.WriteLine(v.Amount + v.Message);  
    `,
    moreInfo:'https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/classes-and-structs/anonymous-types'
},
'Query expressions':{
    info:
    `
    //Query syntax:
    IEnumerable<int> numQuery1 = 
        from num in numbers
        where num % 2 == 0
        orderby num
        select num;

    //Method syntax:
    IEnumerable<int> numQuery2 = numbers
        .Where(num => num % 2 == 0)
        .OrderBy(n => n);
    `,
    moreInfo: 'https://docs.microsoft.com/en-us/dotnet/csharp/linq/query-expression-basics'
},
'Lambda expression':{
    info:
    `
    // simple example
    x => 2*x

    public List<int> FilterOut(List<int> list, Func<int, bool> filterCriteria)
    {
        // function in "Where" 
        return list.Where(myValue => !filterCriteria(myValue));
    }
     
    public void SomeMethod(List<int> values)
    {
        // funcion passed to "FilterOut"
        var myNewList = FilterOut(values, x => x == 6);
        myNewList = FilterOut(values, x => x == 6 || x == 7);
        myNewList = FilterOut(values, x => x > 6 && x < 12);
     
    }
    `,
    moreInfo: 'https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/statements-expressions-operators/lambda-expressions'

},
'Expression trees':{
    info:
    `
    /* An expression tree provides a method of 
    translating executable code into data. 
    This can be very valuable if you want to modify 
    or transform code before executing it. 
    In particular, it can be useful if you want
    to transform C# code such as a LINQ query 
    expression into code that operates
    on another process, such as a SQL database.
    */
    Expression<Func<int, int, int>> expression = (a,b) => a + b;

    // this LINQ-To-SQL query is of Type IQueryable
    // and will be translated to SQL
    var query = from c in db.Customers
        where c.City == "Nantes"
        select new { c.City, c.CompanyName };
    
    public interface IQueryable : IEnumerable
    {
      Type ElementType { get; }
      // Every IQueryable contains Expression Tree
      Expression Expression { get; }
      IQueryProvider Provider { get; }
    }
    

    /* This is the translation result

    SELECT [t0].[City], [t0].[CompanyName]
    FROM [dbo].[Customers] AS [t0]
    WHERE [t0].[City] = @p0
    */
    `,
    moreInfo: 'https://blogs.msdn.microsoft.com/charlie/2008/01/31/expression-tree-basics/'
},
'Extension methods':{
    info:
    `
    public static class MyExtensions
    {
        // method with "this" argument...
        public static int WordCount(this String str)
        {
            return str.Split(
                new char[] { ' ', '.', '?' }, 
                StringSplitOptions.RemoveEmptyEntries
            ).Length;
        }
    } 

    // ... can later be used as instance method.
    string s = "Hello Extension Methods";  
    int i = s.WordCount(); 
    `,
    moreInfo:'https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/classes-and-structs/extension-methods'
},
'Dynamic binding': {
    info:
    `
    dynamic d;
    int i = 20;
    d = (dynamic)i;
    Console.WriteLine(d);

    string s = "Example string.";
    d = (dynamic)s;
    Console.WriteLine(d);

    DateTime dt = DateTime.Today;
    d = (dynamic)dt;
    Console.WriteLine(d);
    `,
    moreInfo:'https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/dynamic'
},
'Named/optional arguments':{
    info:
    `
    // Named arguments can be supplied for the parameters in any order.
    PrintOrderDetails(
        orderNum: 31, 
        productName: "Red Mug", 
        sellerName: "Gift Shop");
    PrintOrderDetails(
        productName: "Red Mug", 
        sellerName: "Gift Shop", 
        orderNum: 31);

    // --------------------- Optional arguments -------------------
    // The first parameter, required, has no default value assigned
    // to it. Therefore, it is not optional. Both optionalstr and 
    // optionalint have default values assigned to them. They are optional.
    public void ExampleMethod(
        int required, 
        string optionalstr = "default string",
        int optionalint = 10)
    {
        Console.WriteLine(
            "{0}: {1}, {2}, and {3}.",
            _name, 
            required, 
            optionalstr,
            optionalint);
    }

    anotherExample.ExampleMethod(1, "One", 1);
    anotherExample.ExampleMethod(2, "Two");
    anotherExample.ExampleMethod(3);

    `,
    moreInfo:'https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/classes-and-structs/named-and-optional-arguments'
},
'Generic covariant and contravariant':{
    info:
    `
    // Covariance
    IEnumerable<Derived> d = new List<Derived>();
    IEnumerable<Base> b = d;

    // Contravariance
    Action<Base> b = (target) => { Console.WriteLine(target.GetType().Name); };
    Action<Derived> d = b;
    d(new Derived());
    `,
    moreInfo:'https://docs.microsoft.com/en-us/dotnet/standard/generics/covariance-and-contravariance'
},
'Embedded interop types':{
    info:
    `
    Better see "more info", :) 
    `,
    moreInfo:'https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/concepts/assemblies-gac/walkthrough-embedding-types-from-managed-assemblies-in-visual-studio'
},
'Asynchronous members':{
    info:
    `    
    public async Task<int> GetDotNetCountAsync()
    {
        // Suspends GetDotNetCountAsync() to allow the caller (the web server)
        // to accept another request, rather than blocking on this one.
        var html = await _httpClient.DownloadStringAsync("http://dotnetfoundation.org");
    
        return Regex.Matches(html, ".NET").Count;
    }
    `,
    moreInfo:'https://docs.microsoft.com/en-us/dotnet/csharp/async'
},
'Caller info attributes':{
    info:
    `
    using System.Runtime.CompilerServices;
    using System.Diagnostics;

    public void DoProcessing()  
    {  
        TraceMessage("Something happened.");  
    }  
    
    public void TraceMessage(string message,  
            [CallerMemberName] string memberName = "",  
            [CallerFilePath] string sourceFilePath = "",  
            [CallerLineNumber] int sourceLineNumber = 0)  
    {  
        Trace.WriteLine("message: " + message);  
        Trace.WriteLine("member name: " + memberName);  
        Trace.WriteLine("source file path: " + sourceFilePath);  
        Trace.WriteLine("source line number: " + sourceLineNumber);  
    }  
    
    // Sample Output:  
    //  message: Something happened.  
    //  member name: DoProcessing  
    //  source file path: c:\Users\\username\Documents\Visual Studio 2012\Projects\CallerInfoCS\CallerInfoCS\Form1.cs  
    //  source line number: 31  
    `,
    moreInfo:'https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/concepts/caller-information'
},
'Static imports':{
    info:
    `
    using static System.Console;

    var input = ReadLine();
    `,
    moreInfo:'https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/using-static'
},
'Exception filters':{
    info:
    `
    static void Main()
    {
        try
        {
            Foo.DoSomethingThatMightFail(null);
        }
        // "when" is the Exception filter
        catch (MyException ex) when (ex.Code == 42)
        {
            Console.WriteLine("Error 42 occurred");
        }
    }
    `,
    moreInfo:'https://www.thomaslevesque.com/2015/06/21/exception-filters-in-c-6/'
},
'Property initializers':{
    info:
    `
    public class PepperoniPizza
    {
        public decimal ExtraPrice { get; set; } = 0.25m;
    }

    public string Name { get; protected set; } = "Cheeze";

    public decimal Price2 { get; set; } = 1m + 2m;
    
    public double Price3 { get; set; } = Math.PI;
    `,
    moreInfo:'http://geekswithblogs.net/WinAZ/archive/2015/06/30/whatrsquos-new-in-c-6.0-auto-property-initializers.aspx'
},
'Expression bodied members':{
    info:
    `
    public string GetFullName() => FirstName + " " + LastName;
    
    public string FormalName => FirstName[0] + ". " + LastName;
    `,
    moreInfo:'https://lostechies.com/jimmybogard/2015/12/17/c-6-feature-review-expression-bodied-function-members/'
},
'Null propagator':{
    info:
    `
    // Before
    double minPrice = 0;
    
    if (product != null
        && product.PriceBreaks != null
        && product.PriceBreaks[0] != null)
    {
        minPrice = product.PriceBreaks[0].Price;
    }

    // With Null propagator
    var minPrice = product?.PriceBreaks?[0]?.Price;
    `,
    moreInfo:'https://davefancher.com/2014/08/14/c-6-0-null-propagation-operator/'
},
'String interpolation':{
    info:
    `
    // Before (composite format)
    Console.WriteLine("Name = {0}, hours = {1:hh}", name, hours);

    // Interpopated strings
    Console.WriteLine($"Name = {name}, hours = {hours:hh}");
    `,
    moreInfo:'https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/interpolated-strings'
},
'nameof operator':{
    info:
    `
    if (x == null) throw new ArgumentNullException(nameof(x));  
    // prints "ZipCode"
    WriteLine(nameof(person.Address.ZipCode)); 

    using Stuff = Some.Cool.Functionality  
    class C {  
        static int Method1 (string x, int y) {}  
        static int Method1 (string x, string y) {}  
        int Method2 (int z) {}  
        string f<T>() => nameof(T);  
    }  
    
    // -----------------------

    var c = new C()  
    
    nameof(C) -> "C"  
    nameof(C.Method1) -> "Method1"   
    nameof(C.Method2) -> "Method2"  
    nameof(c.Method1) -> "Method1"   
    nameof(c.Method2) -> "Method2"  
    nameof(z) -> "z" // inside of Method2 ok, inside Method1 is a compiler error  
    nameof(Stuff) = "Stuff"  
    nameof(T) -> "T" // works inside of method but not in attributes on the method  
    nameof(f) -> "f"  
    nameof(f<T>) -> syntax error  
    nameof(f<>) -> syntax error  
    nameof(Method2()) -> error "This expression does not have a name"  
    `,
    moreInfo:'https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/nameof'
},
'Dictionary initializer':{
    info:
    `
    class StudentName
    {        
        public string Name { get; set; }
        public int ID { get; set; }
    }
    
    class CollInit
    {
        Dictionary<int, StudentName> students = 
            new Dictionary<int, StudentName>()
            {
                { 111, new StudentName {Name="Sachin", ID=211}},
                { 112, new StudentName {Name="Dina", ID=317}},
                { 113, new StudentName {Name="Andy", ID=198}}
            };
    }
    `,
    moreInfo:'https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/classes-and-structs/how-to-initialize-a-dictionary-with-a-collection-initializer'
}
    
}

export default featuresInfo