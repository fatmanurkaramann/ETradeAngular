import { Component, OnInit } from '@angular/core';
import { LoginModel } from 'src/app/models/auths/login.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { RegisterModel } from 'src/app/models/auths/register.model';
import {Router} from '@angular/router'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup
  registerForm : FormGroup
  constructor(
    private formBuilder:FormBuilder,
    private authService:AuthService,
    private toastrService:ToastrService,
    private spinner:NgxSpinnerService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.createLoginForm();
    this.createRegisterForm();
    $(function(){
      var log = $("#log");
      var reg=$("#reg")
      reg.click(function(){
       $("#login").css("left","-400px")
       $("#register").css("left","50px")
       $("#btn").css("left","110px")

      })
      log.click(function(){
        $("#login").css("left","50px")
        $("#register").css("left","450px")
        $("#btn").css("left","0px")
      })

    })
  }

  createLoginForm(){
    this.loginForm = this.formBuilder.group({
      emailOrUsername: ["",[Validators.required]],
      password: ["",[Validators.required, Validators.min(2)]],
    })
  }
  createRegisterForm(){
    this.registerForm = this.formBuilder.group({
      email:["",[Validators.required,Validators.email]],
      userName :["",[Validators.required,Validators.minLength(2)]],
      password:["",[Validators.required,Validators.minLength(2)]],
      firstName:["",[Validators.required,Validators.minLength(2)]],
      lastName: ["",[Validators.required,Validators.minLength(2)]],
      fullAddress :["",Validators.required]
    })
  }
  async login(){

    this.spinner.show();
    if (this.loginForm.valid) {
      const loginModel: LoginModel = Object.assign({},this.loginForm.value);
      const result = await this.authService.login(loginModel);
      if(result.success){
        localStorage.setItem("token",result.data.accessToken.token)
        localStorage.setItem("user",JSON.stringify(result.data.user))
        this.toastrService.success(result.message);
        this.authService.identityCheck();
        this.router.navigate([""])
      }
      else{
        this.toastrService.error(result.message,"Hata!")
      }
    }else{
      this.toastrService.error("Zorunlu alanları doldurun");
    }
    this.spinner.hide();
  }
  async register(){
    this.spinner.show();
    if(this.registerForm.valid){
      const registerModel : RegisterModel = Object.assign({},this.registerForm.value);
      const result = await this.authService.register(registerModel,async ()=>{
        this.loginForm.setValue({
          emailOrUsername: registerModel.email,
          password: registerModel.password
        })
        await this.login()
      })
      result.success
        ? this.toastrService.success(result.message,"Hesap oluşturuldu.")
        : this.toastrService.error(result.message,"Hesap oluşturulurken hata!")
    }
    this.spinner.hide();
  }
}
