using Microsoft.AspNetCore.Mvc;
using ExampleAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace ExampleAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactsController : Controller
    {
        private readonly ContactContext _context;

        public ContactsController(ContactContext context)
        {
            _context = context;
            
        }

        [HttpGet]
        public async Task<IActionResult> Index()
        {
            return _context.Contacts != null ?
                        new ObjectResult(await _context.Contacts.ToListAsync()) :
                        Problem("Entity set 'UserContext.Contacts'  is null.");
        }

        [HttpPost]
        public async Task<ActionResult> create(Contact contact)
        {
            if (ModelState.IsValid)
            {
                _context.Add(contact);
                await _context.SaveChangesAsync();
                return CreatedAtAction(nameof(Index), new { id = contact.Id }, contact);
            }
            return View();
        }

        [HttpGet("{userId}")]
        public async Task<ActionResult> getUserContacts(string userId)
        {
            var contacts = (await _context.Contacts.ToListAsync()).FindAll(c => c.userId == userId);
            return new ObjectResult(contacts);
        }
        [HttpPut("edit/{id}")]
        public async Task<IActionResult> Edit(string id, Contact contact)
        {
            if (id != contact.Id)
            {
                return NotFound();
            }
            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(contact);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!ContactExists(contact.Id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return CreatedAtAction(nameof(Index), new { id = contact.Id }, contact);
            }
            return View();

        }
        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteConfirmed(string? id)
        {
            if (_context.Contacts == null)
            {
                return Problem("Entity set 'UserContext.Users' is null.");
            }
            var user = await _context.Contacts.FindAsync(id);
            if (user != null)
            {
                _context.Contacts.Remove(user);
            }

            await _context.SaveChangesAsync();
            return new ObjectResult(await _context.Contacts
                .ToListAsync());
        }

        private bool ContactExists(string id)
        {
            return (_context.Contacts?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
