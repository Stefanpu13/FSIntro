<template>
        <code class="csharp">

          // Declare the generic class.
          public class GenericList&ltT&gt
          {
              void Add(T input) { }
          }
          class TestGenericList
          {
              private class ExampleClass { }
              static void Main()
              {
                  // Declare a list of type int.
                  GenericList&ltint&gt list1 = new GenericList&ltint&gt();                  

                  // Declare a list of type string.
                  GenericList&ltstring&gt list2 = new GenericList&ltstring&gt();

                  // Declare a list of type ExampleClass.
                  GenericList&ltExampleClass&gt list3 = new GenericList&ltExampleClass&gt();
              }
          }
          {{formattedFeatureInfo}}
        </code>
</template>

<script>


  export default {
    name:"Code",
    props:['featureInfo'],
    computed:{
        formattedFeatureInfo(){
            return this.featureInfo.replace('<', '&lt').replace('>', '&gt');
        } 
    }
  }
</script>
