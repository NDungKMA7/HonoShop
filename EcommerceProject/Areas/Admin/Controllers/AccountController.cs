using EcommerceProject.DTO;
using EcommerceProject.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace EcommerceProject.Areas.Admin.Controllers
{
    [Area("Admin")]
    public class AccountController : Controller
    {
        private readonly RoleManager<IdentityRole> roleManager;

        private readonly UserManager<ApplicationUser> userManager;

        private readonly SignInManager<ApplicationUser> _signInManager;

        public AccountController(
          UserManager<ApplicationUser> userManager,
          SignInManager<ApplicationUser> signInManager, RoleManager<IdentityRole> roleManager
          )
        {

            this.userManager = userManager;
            this._signInManager = signInManager;
            this.roleManager = roleManager;
        }
        public IActionResult Login()
        {

            return View("Login");
        }
        [HttpPost]
        public async Task<IActionResult> LoginPostAdmin(IFormCollection fc)
        {
            if (!ModelState.IsValid)
            {
                return RedirectToAction("Login");
            }
            var model = new LoginModel();
            model.Username = fc["Username"].ToString().Trim();
            model.Email = fc["Email"].ToString().Trim();
            model.Password = fc["Password"].ToString().Trim();
            var checkbox = fc["RememberMe"].ToString();
            var RemeberMeBool = (checkbox == "on") ? true : false;
            model.RememberMe = RemeberMeBool;
            var user = await userManager.FindByEmailAsync(model.Email);
            if (user != null)
            {
                var result = await _signInManager.PasswordSignInAsync(model.Username, model.Password, model.RememberMe, lockoutOnFailure: false);
                if (result.Succeeded)
                {
                    return Redirect("/Admin/Home/Index");

                }
                return RedirectToAction("Login");
            }
            return RedirectToAction("Login");
        }
        
        public async Task<IActionResult> Logout()
        {
            await _signInManager.SignOutAsync();

            return RedirectToAction("Login");
        }
    }
}
