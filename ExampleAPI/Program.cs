using Microsoft.EntityFrameworkCore;
using ExampleAPI.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddMvc();

builder.Services.AddDbContext<UserContext>(opt =>
{
    opt.UseInMemoryDatabase("Users");   
});

builder.Services.AddDbContext<ContactContext>(opt =>
{
    opt.UseInMemoryDatabase("Contacts");
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}

app.UseHttpsRedirection();

app.UseCors(opt => opt.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());

app.UseAuthorization();

app.MapControllers();

app.Run();
