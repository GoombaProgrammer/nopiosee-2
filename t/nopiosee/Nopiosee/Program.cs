// See https://aka.ms/new-console-template for more information
using Qualleish;
using System.Runtime.InteropServices;
using System.Text;

[DllImport("kernel32.dll", SetLastError = true)]
static extern IntPtr GetStdHandle(int nStdHandle);

[DllImport("kernel32.dll")]
static extern bool ReadConsoleW(IntPtr hConsoleInput, [Out] byte[]
   lpBuffer, uint nNumberOfCharsToRead, out uint lpNumberOfCharsRead,
   IntPtr lpReserved);

IntPtr GetWin32InputHandle()
{
    const int STD_INPUT_HANDLE = -10;
    IntPtr inHandle = GetStdHandle(STD_INPUT_HANDLE);
    return inHandle;
}

string ReadLine()
{
rpeeat:
    try
    {
        const int bufferSize = 4096;
        var buffer = new byte[bufferSize];

        uint charsRead = 0;

        ReadConsoleW(GetWin32InputHandle(), buffer, bufferSize, out charsRead, (IntPtr)0);
        // -2 to remove ending \n\r
        int nc = ((int)charsRead - 2) * 2;
        var b = new byte[nc];
        for (var i = 0; i < nc; i++)
            b[i] = buffer[i];

        var utf8enc = Encoding.UTF8;
        var unicodeenc = Encoding.Unicode;
        return utf8enc.GetString(Encoding.Convert(unicodeenc, utf8enc, b));
    }
    catch {
        goto rpeeat;
    }
}
bool oneliner = false;
bool back = false;
Console.WriteLine("Welcome to ETN (English To Nopiosee)");
if (args.Length > 0)
{
    if (args[0] == "back")
    {
        back = true;
    }
    else if (args[0] == "oneliner")
    {
        oneliner = true;
    }
}
loop:
Console.WriteLine("To Translate (will be translated in lowercase):");
if (oneliner) Console.WriteLine("Type 'x' on a single line to submit");
string tot = "";
if (oneliner)
{
    while (!(tot += ReadLine().ToLower() + "\n").EndsWith("\nx\n"))
    {
    }
    tot = tot.Substring(0, tot.Length - 2);
}
else
{
    tot = ReadLine().ToLower() + "";
}
string output = "";
(string, int) nextword = ("", 0);
string[] tots = tot.Split(' '/*, '.', ',', '!', '?', '\''*/);
if (back)
{
    for (int i = 0; i < tots.Length + 1; i++)
    {
        if (tots.Length > i)
        {
            string toaddatend = "";
            if (tots[i].EndsWith('.'))
            {
                toaddatend = ".";
                tots[i] = tots[i].Substring(0, tots[i].Length - 1);
            }
            if (tots[i].EndsWith('?'))
            {
                toaddatend = "?";
                tots[i] = tots[i].Substring(0, tots[i].Length - 1);
            }
            if (tots[i].EndsWith('!'))
            {
                toaddatend = "!";
                tots[i] = tots[i].Substring(0, tots[i].Length - 1);
            }
            if (tots[i].EndsWith(','))
            {
                toaddatend = ",";
                tots[i] = tots[i].Substring(0, tots[i].Length - 1);
            }
            if (i != 0 && nextword.Item2 == i)
            {
                output += nextword.Item1 + " ";
            }
            if ((i + 1) < tots.Length && Lexer.words.ContainsValue((tots[i] + " " + tots[i + 1], "afternext")))
            {

                string outputa = output.Substring(0, output.Substring(0, output.LastIndexOf(" ")).LastIndexOf(" ") + 1); 
                output = output.Replace(outputa, outputa + Lexer.words.FirstOrDefault(x => x.Value == (tots[i] + " " + tots[i + 1], "afternext")).Key + " ");
                i++;
                continue;
            }
            if (tots[i]  == "con" && i != tots.Length)  // yep, its hardcoded (sorry)
            {
                output += "a";
                string tata = Lexer.words.FirstOrDefault(x => x.Value == (tots[i + 1], "default")).Key + " ";
                if (tata.StartsWith("a") || tata.StartsWith("i") || tata.StartsWith("e") || tata.StartsWith("o") || tata.StartsWith("u")) output += "n";
                output += " ";
                continue;
            }
            if (Lexer.words.ContainsValue((tots[i], "afternext")))
            {
                string outputa = output.Substring(0, output.Substring(0, output.LastIndexOf(" ")).LastIndexOf(" ") + 1);
                    output = output.Replace(outputa, outputa + Lexer.words.FirstOrDefault(x => x.Value == (tots[i], "afternext")).Key + " ");
                    continue;
            }
            if ((i+1) < tots.Length && Lexer.words.ContainsValue(((tots[i] + " " + tots[i + 1]).Substring(0, (tots[i] + " " + tots[i + 1]).Length/* - 1 */), "default")))
            {
                if ((tots[i] + " " + tots[i + 1]).EndsWith("a") && (tots[i] + " " + tots[i + 1]).Length != 2 && !(tots[i] + " " + tots[i + 1]).EndsWith("aa") && Lexer.words.ContainsValue(((tots[i] + " " + tots[i + 1]).Substring(0, (tots[i] + " " + tots[i + 1]).Length - 1), "default")))  // Multiple
                {
                    output += Lexer.words.FirstOrDefault(x => x.Value == ((tots[i] + " " + tots[i + 1]).Substring(0, (tots[i] + " " + tots[i + 1]).Length - 1), "default")).Key + "s" + " ";
                    continue;
                }
                if ((tots[i] + " " + tots[i + 1]).EndsWith("o") && !(tots[i] + " " + tots[i + 1]).EndsWith("oo") && Lexer.words.ContainsValue(((tots[i] + " " + tots[i + 1]).Substring(0, (tots[i] + " " + tots[i + 1]).Length - 1), "default")))  // Multiple
                {
                    output += Lexer.words.FirstOrDefault(x => x.Value == ((tots[i] + " " + tots[i + 1]).Substring(0, (tots[i] + " " + tots[i + 1]).Length - 1), "default")).Key + "r" + " ";
                    continue;
                }
                if ((tots[i] + " " + tots[i + 1]).EndsWith("oa") && !(tots[i] + " " + tots[i + 1]).EndsWith("oaoa") && Lexer.words.ContainsValue((tots[i].Substring(0, (tots[i] + " " + tots[i + 1]).Length - 2), "default")))  // Multiple
                {
                    output += Lexer.words.FirstOrDefault(x => x.Value == ((tots[i] + " " + tots[i + 1]).Substring(0, (tots[i] + " " + tots[i + 1]).Length - 2), "default")).Key + "rs" + " ";
                    continue;
                }
                if ((tots[i] + " " + tots[i + 1]).EndsWith("e") && !(tots[i] + " " + tots[i + 1]).EndsWith("ee") && Lexer.words.ContainsValue((tots[i].Substring(0, (tots[i] + " " + tots[i + 1]).Length - 1), "default")))  // Multiple
                {
                    output += Lexer.words.FirstOrDefault(x => x.Value == ((tots[i] + " " + tots[i + 1]).Substring(0, (tots[i] + " " + tots[i + 1]).Length - 1), "default")).Key + "ly" + " ";
                    continue;
                }
                if (!Lexer.words.ContainsValue(((tots[i] + " " + tots[i + 1]), "default")))
                {
                    output += (tots[i]) + " ";
                    continue;
                }
                if (Lexer.words.ContainsValue((tots[i] + " " + tots[i + 1], "afternext")))
                {
                    output += Lexer.words.FirstOrDefault(x => x.Value == (tots[i] + " " + tots[i + 1], "afternext")).Key + " ";
                    i++;
                    continue;
                }
                if ((i + 1) < tots.Length && Lexer.words.ContainsValue((tots[i] + " " + tots[i + 1], "afternext")))
                {
                    output += Lexer.words.FirstOrDefault(x => x.Value == (tots[i] + " " + tots[i + 1], "afternext")).Key + " ";
                    i++;
                    continue;
                }
                output += Lexer.words.FirstOrDefault(x => x.Value == (tots[i] + " " + tots[i + 1], "default")).Key + " ";
                i++;
            }
            else
            {
                if ((i + 1) < tots.Length && tots[i + 1].EndsWith('.'))
                {
                    toaddatend = ".";
                    tots[i + 1] = tots[i + 1].Substring(0, tots[i + 1].Length - 1);
                }
                if ((i + 1) < tots.Length && tots[i + 1].EndsWith('?'))
                {
                    toaddatend = "?";
                    tots[i + 1] = tots[i + 1].Substring(0, tots[i + 1].Length - 1);
                }
                if ((i + 1) < tots.Length && tots[i + 1].EndsWith('!'))
                {
                    toaddatend = "!";
                    tots[i + 1] = tots[i + 1].Substring(0, tots[i + 1].Length - 1);
                }
                if ((i + 1) < tots.Length && tots[i + 1].EndsWith(','))
                {
                    toaddatend = ",";
                    tots[i + 1] = tots[i + 1].Substring(0, tots[i + 1].Length - 1);
                }
                if ((i + 1) < tots.Length && Lexer.words.ContainsValue((tots[i] + " " + tots[i + 1], "afternext")))
                {
                    try
                    {
                        string outputa = output.Substring(0, output.Substring(0, output.LastIndexOf(" ")).LastIndexOf(" ") + 1);
                        output = output.Replace(outputa, outputa + Lexer.words.FirstOrDefault(x => x.Value == (tots[i] + " " + tots[i + 1], "afternext")).Key + " ");
                        i++;
                    }
                    catch
                    {
                        // TODO: Handle exception.
                    }
                    continue;
                }
                if ((i + 1) < tots.Length && tots[i + 1].EndsWith("a") && tots[i].Length != 2 && !tots[i].EndsWith("aa") && Lexer.words.ContainsValue((tots[i].Substring(0, tots[i].Length - 1), "default")))  // Multiple
                {
                    output += Lexer.words.FirstOrDefault(x => x.Value == (tots[i].Substring(0, tots[i].Length - 1), "default")).Key + "s" + " ";
                    continue;
                }
                if (tots[i].EndsWith("o") && !tots[i].EndsWith("oo") && Lexer.words.ContainsValue((tots[i].Substring(0, tots[i].Length - 1), "default")))  // Multiple
                {
                    output += Lexer.words.FirstOrDefault(x => x.Value == (tots[i].Substring(0, tots[i].Length - 1), "default")).Key + "r" + " ";
                    continue;
                }
                if (tots[i].EndsWith("oa") && !tots[i].EndsWith("oaoa") && Lexer.words.ContainsValue((tots[i].Substring(0, tots[i].Length - 2), "default")))  // Multiple
                {
                    output += Lexer.words.FirstOrDefault(x => x.Value == (tots[i].Substring(0, tots[i].Length - 2), "default")).Key + "rs" + " ";
                    continue;
                }
                if (tots[i].EndsWith("e") && !tots[i].EndsWith("ee") && Lexer.words.ContainsValue((tots[i].Substring(0, tots[i].Length - 1), "default")))  // Multiple
                {
                    output += Lexer.words.FirstOrDefault(x => x.Value == (tots[i].Substring(0, tots[i].Length - 1), "default")).Key + "ly" + " ";
                    continue;
                }
                if (!Lexer.words.ContainsValue((tots[i], "default")))
                {
                    output += tots[i] + " ";
                    continue;
                }
                output += Lexer.words.FirstOrDefault(x => x.Value == (tots[i], "default")).Key + " ";
            }
            output += toaddatend;
        }
        else {

            if ((i + 1) < tots.Length && Lexer.words.ContainsValue((tots[i] + " " + tots[i + 1], "afternext")))
            {
                string outputa = output.Substring(0, output.Substring(0, output.LastIndexOf(" ")).LastIndexOf(" ") + 1); 
                output = output.Replace(outputa, outputa + Lexer.words.FirstOrDefault(x => x.Value == (tots[i] + " " + tots[i + 1], "afternext")).Key + " ");
                i++;
                continue;
            }
            if (i != 0 && nextword.Item2 == i)
            {
                output += nextword.Item1 + " ";
            }
        }
    }
}
else
{
    bool nexting = false;
    string prevtoaddatend = "";
    for (int i = 0; i < tots.Length + 1; i++)
    {
        if (tots.Length > i)
        {
            string toaddatend = "";
            if (tots[i].EndsWith('.'))
            {
                toaddatend = ".";
                tots[i] = tots[i].Substring(0, tots[i].Length - 1);
                prevtoaddatend = toaddatend;
            }
            if (tots[i].EndsWith('?'))
            {
                toaddatend = "?";
                tots[i] = tots[i].Substring(0, tots[i].Length - 1);
                prevtoaddatend = toaddatend;
            }
            if (tots[i].EndsWith('!'))
            {
                toaddatend = "!";
                tots[i] = tots[i].Substring(0, tots[i].Length - 1);
                prevtoaddatend = toaddatend;
            }
            if (tots[i].EndsWith(','))
            {
                toaddatend = ",";
                tots[i] = tots[i].Substring(0, tots[i].Length - 1);
                prevtoaddatend = toaddatend;
            }
            try
            {
                if (Lexer.words.ContainsKey(tots[i] + " " + tots[i + 1]))
                {
                    output += Lexer.words[tots[i] + " " + tots[i + 1]].Item1 + " ";
                    i++;
                    continue;
                }
            }
            catch { }
            if (i != 0 && nextword.Item2 == i)
            {
                output += nextword.Item1 + prevtoaddatend + " ";
                prevtoaddatend = "";
            }

            if (Lexer.words.ContainsKey(tots[i]))
            {
                if (Lexer.words[tots[i]].Item2 == "afternext")
                {
                    if (tots.Length > i + 1)
                    {
                        nextword = (Lexer.words[tots[i]].Item1, i + 2);
                        nexting = true;
                    }
                    else
                    {
                        output += Lexer.words[tots[i]].Item1 + " ";
                    }
                    continue;
                }
            }
            if (tots[i].EndsWith("s") && tots[i].Length != 2 && !tots[i].EndsWith("ss") && Lexer.words.ContainsKey(tots[i].Substring(0, tots[i].Length - 1)))  // Multiple
            {
                output += Lexer.words[tots[i].Substring(0, tots[i].Length - 1)].Item1 + "a" + " ";
                continue;
            }
            if (tots[i].EndsWith("r") && !tots[i].EndsWith("rr") && Lexer.words.ContainsKey(tots[i].Substring(0, tots[i].Length - 1)))  // Multiple
            {
                output += Lexer.words[tots[i].Substring(0, tots[i].Length - 1)].Item1 + "o" + " ";
                continue;
            }
            if (tots[i].EndsWith("rs") && !tots[i].EndsWith("rsrs") && Lexer.words.ContainsKey(tots[i].Substring(0, tots[i].Length - 2)))  // Multiple
            {
                output += Lexer.words[tots[i].Substring(0, tots[i].Length - 2)].Item1 + "oa" + " ";
                continue;
            }
            if (tots[i].EndsWith("ly") && !tots[i].EndsWith("lyly") && Lexer.words.ContainsKey(tots[i].Substring(0, tots[i].Length - 2)))  // Multiple
            {
                output += Lexer.words[tots[i].Substring(0, tots[i].Length - 2)].Item1 + "e" + " ";
                continue;
            }
            if (!Lexer.words.ContainsKey(tots[i]))
            {
                    output += tots[i] + " ";
                    continue;
            }
            if (!nexting)
            {
                output += Lexer.words[tots[i]].Item1 + ((Lexer.words[tots[i]].Item2 == "default") ? toaddatend : "") + " ";
            }
            else
            {
                nexting = false;
                output += Lexer.words[tots[i]].Item1 + " ";
            }
        }
        else
        {
            try
            {
                if (Lexer.words.ContainsKey(tots[i] + " " + tots[i + 1]))
                {
                    output += Lexer.words[tots[i] + " " + tots[i + 1]].Item1 + " ";
                    i++;
                    continue;
                }
            }
            catch { }
            if (i != 0 && nextword.Item2 == i)
            {
                output += nextword.Item1 +prevtoaddatend + " ";
                prevtoaddatend = "";
            }
        }
    }
}
Console.WriteLine(char.ToUpper(output[0]) + output[1..]);
goto loop;