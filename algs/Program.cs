
List<String> openBrackets = new List<String> { "{", "(", "[" };
Dictionary<char, char> closeMappings = new Dictionary<char, char> ();
closeMappings.Add(')', '(');
closeMappings.Add('}', '{');
closeMappings.Add(']', '[');

bool isBalanced(String input)
{
   
    Stack<char> brackets = new Stack<char>();
    for(int i = 0; i < input.Length; i++)
    {
        if (openBrackets.Contains(input[i].ToString()))
        {
            brackets.Push(input[i]);
        }
        else
        {
            brackets.TryPeek(out char top);
            closeMappings.TryGetValue(input[i], out char aux);
            if(top != aux)
            {
                return false;
            }
            brackets.Pop();

        }
    }
    
    return !brackets.TryPeek(out var r);
}

while (true)
{
    var b = Console.ReadLine();
    Console.WriteLine(isBalanced(b));
}
