import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { RecipeModel } from '../model/recipeModel';

@Component({
  selector: 'app-manage-recipe',
  templateUrl: './manage-recipe.component.html',
  styleUrl: './manage-recipe.component.css'
})
export class ManageRecipeComponent {

  recipeDetails:RecipeModel = {}
  cuisineArray:any = []
  mealTypeArray:any = []
  ingredients:any = []
  instructions:any = []
  mealArray:any = []

  constructor(private api:ApiService){}
  ngOnInit(){
    this.getAllRecipes()
  }
  getAllRecipes(){
    this.api.getAllRecipeAPI().subscribe((res:any)=>{
      res.forEach((item:any)=>{
        !this.cuisineArray.includes(item.cuisine) && this.cuisineArray.push(item.cuisine)
      })
      console.log(this.cuisineArray);  
      const dummyMeal = res.map((item:any)=>item.mealType)    
      // console.log(dummyMeal.flat(Infinity));  
      const flatDummyArray = dummyMeal.flat(Infinity)
      flatDummyArray.forEach((item:any)=>{
        !this.mealTypeArray.includes(item) && this.mealTypeArray.push(item)
      })
      console.log(this.mealTypeArray);
    })
  }

  addIngredients(ingredientInput:any){
    if(ingredientInput.value){
      this.ingredients.push(ingredientInput.value)
      ingredientInput.value = ""
      console.log(this.ingredients);
    }
  }

  removeIngredients(value:string){
    this.ingredients = this.ingredients.filter((item:string)=>item!=value)
  }

  addInstructions(instructionInput:any){
    if(instructionInput.value){
      this.instructions.push(instructionInput.value)
      instructionInput.value = ""
      console.log(this.instructions);
    }
  }

  removeInstructions(value:string){
    this.instructions = this.instructions.filter((item:string)=>item!=value)
  }

  mealTypeSelect(event:any){
    if(event.target.checked){
      this.mealArray.push(event.target.name)
    }else{
      this.mealArray = this.mealArray.filter((item:string)=>item!=event.target.name)
    }
    console.log(this.mealArray);
  }

  
  addRecipe(){
    console.log(this.recipeDetails);    
  }

}
