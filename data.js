// このファイルは build_data.py によって自動生成されます。直接編集しないでください。
window.BUILTIN_SETS = [
  {
    "id": "python_basics",
    "title": "Python 基礎",
    "description": "リスト・辞書・文字列・演算子など基本構文の問題集",
    "difficulty": "初級",
    "questions": [
      {
        "id": 1,
        "question": "実行結果は？",
        "code": "x = [1, 2, 3]\nprint(len(x))",
        "choices": [
          "2",
          "3",
          "4",
          "エラー"
        ],
        "answer": 2,
        "explanation": "len()はシーケンスの要素数を返す。リスト[1,2,3]の要素は3つなので3を返す。"
      },
      {
        "id": 2,
        "question": "実行結果は？",
        "code": "print(type(3.14))",
        "choices": [
          "<class 'int'>",
          "<class 'float'>",
          "<class 'str'>",
          "<class 'num'>"
        ],
        "answer": 2,
        "explanation": "3.14は小数なので浮動小数点数型(float)。type()はオブジェクトの型を返す。"
      },
      {
        "id": 3,
        "question": "実行結果は？",
        "code": "x = 10\ny = 3\nprint(x % y)",
        "choices": [
          "3",
          "1",
          "0",
          "エラー"
        ],
        "answer": 2,
        "explanation": "%は剰余演算子。10÷3=3余り1なので、10%3は1を返す。"
      },
      {
        "id": 4,
        "question": "実行結果は？",
        "code": "s = 'hello'\nprint(s[1])",
        "choices": [
          "h",
          "e",
          "l",
          "エラー"
        ],
        "answer": 2,
        "explanation": "文字列のインデックスは0始まり。s[0]='h'、s[1]='e'となる。"
      },
      {
        "id": 5,
        "question": "実行結果は？",
        "code": "x = True\ny = False\nprint(x and y)",
        "choices": [
          "True",
          "False",
          "None",
          "エラー"
        ],
        "answer": 2,
        "explanation": "andは両方がTrueのときのみTrueを返す論理積演算子。TrueとFalseのandはFalse。"
      },
      {
        "id": 6,
        "question": "実行結果は？",
        "code": "print(10 // 3)",
        "choices": [
          "3.33",
          "3",
          "4",
          "エラー"
        ],
        "answer": 2,
        "explanation": "//は切り捨て除算（整数除算）演算子。10÷3=3.33...の小数部を切り捨てて3を返す。"
      },
      {
        "id": 7,
        "question": "実行結果は？",
        "code": "lst = [1, 2, 3]\nlst.append(4)\nprint(len(lst))",
        "choices": [
          "3",
          "4",
          "5",
          "エラー"
        ],
        "answer": 2,
        "explanation": "append()はリストの末尾に要素を1つ追加する。3要素のリストに1つ追加すると長さは4になる。"
      },
      {
        "id": 8,
        "question": "実行結果は？",
        "code": "x = 'Python'\nprint(x.upper())",
        "choices": [
          "python",
          "PYTHON",
          "Python",
          "エラー"
        ],
        "answer": 2,
        "explanation": "upper()は文字列の全文字を大文字に変換するメソッド。'Python'→'PYTHON'。"
      },
      {
        "id": 9,
        "question": "実行結果は？",
        "code": "d = {'a': 1, 'b': 2}\nprint(d['a'])",
        "choices": [
          "1",
          "2",
          "a",
          "エラー"
        ],
        "answer": 1,
        "explanation": "辞書のキー'a'に対応する値は1。d['キー']でその値にアクセスできる。"
      },
      {
        "id": 10,
        "question": "実行結果は？",
        "code": "for i in range(3):\n    print(i)",
        "choices": [
          "0 1 2",
          "1 2 3",
          "0 1 2 3",
          "エラー"
        ],
        "answer": 1,
        "explanation": "range(3)は0, 1, 2を生成する（3は含まない）。各値が順に出力されるので「0 1 2」（各行）になる。"
      },
      {
        "id": 11,
        "question": "実行結果は？",
        "code": "print(2 ** 3)",
        "choices": [
          "6",
          "8",
          "9",
          "エラー"
        ],
        "answer": 2,
        "explanation": "**はべき乗演算子。2**3は2の3乗（2×2×2）で8。"
      },
      {
        "id": 12,
        "question": "実行結果は？",
        "code": "s = 'hello world'\nprint(s.split())",
        "choices": [
          "['hello world']",
          "['hello', 'world']",
          "('hello', 'world')",
          "エラー"
        ],
        "answer": 2,
        "explanation": "split()は引数なしで呼ぶと空白（スペース）を区切り文字として文字列を分割し、リストを返す。"
      },
      {
        "id": 13,
        "question": "実行結果は？",
        "code": "x = [3, 1, 2]\nx.sort()\nprint(x)",
        "choices": [
          "[3, 1, 2]",
          "[1, 2, 3]",
          "[3, 2, 1]",
          "エラー"
        ],
        "answer": 2,
        "explanation": "sort()はリストをその場で昇順に並び替える（破壊的操作）。[3,1,2]→[1,2,3]。"
      },
      {
        "id": 14,
        "question": "実行結果は？",
        "code": "print('abc' * 2)",
        "choices": [
          "abc2",
          "abcabc",
          "abc abc",
          "エラー"
        ],
        "answer": 2,
        "explanation": "文字列と整数の*演算子は文字列の繰り返しを行う。'abc'*2は'abc'を2回繰り返して'abcabc'。"
      },
      {
        "id": 15,
        "question": "実行結果は？",
        "code": "x = None\nprint(x is None)",
        "choices": [
          "False",
          "True",
          "None",
          "エラー"
        ],
        "answer": 2,
        "explanation": "is演算子はオブジェクトの同一性を確認する。NoneはシングルトンなのでxがNoneならx is NoneはTrue。"
      },
      {
        "id": 16,
        "question": "実行結果は？",
        "code": "a = [1, 2, 3]\nprint(a[-1])",
        "choices": [
          "1",
          "2",
          "3",
          "エラー"
        ],
        "answer": 3,
        "explanation": "負のインデックスは末尾から数える。a[-1]は最後の要素（3）を指す。"
      },
      {
        "id": 17,
        "question": "実行結果は？",
        "code": "def greet(name):\n    return 'Hello ' + name\nprint(greet('World'))",
        "choices": [
          "Hello",
          "Hello World",
          "World",
          "エラー"
        ],
        "answer": 2,
        "explanation": "関数greetは'Hello 'とnameを+で連結して返す。greet('World')は'Hello World'を返す。"
      },
      {
        "id": 18,
        "question": "実行結果は？",
        "code": "x = [0, '', None, 1]\nprint(bool(x[0]))",
        "choices": [
          "True",
          "False",
          "None",
          "エラー"
        ],
        "answer": 2,
        "explanation": "x[0]は0。Pythonでは0、空文字列''、None、空リスト[]などはFalsyな値なのでbool(0)はFalse。"
      },
      {
        "id": 19,
        "question": "実行結果は？",
        "code": "s = 'Python3'\nprint(len(s))",
        "choices": [
          "6",
          "7",
          "8",
          "エラー"
        ],
        "answer": 2,
        "explanation": "'Python3'は'P','y','t','h','o','n','3'の7文字なのでlen()は7を返す。"
      },
      {
        "id": 20,
        "question": "実行結果は？",
        "code": "t = (1, 2, 3)\nprint(t[0])",
        "choices": [
          "1",
          "2",
          "3",
          "エラー"
        ],
        "answer": 1,
        "explanation": "タプルのインデックスも0始まり。t[0]は最初の要素1を返す。"
      },
      {
        "id": 21,
        "question": "実行結果は？",
        "code": "x = 5\nif x > 3:\n    print('big')\nelse:\n    print('small')",
        "choices": [
          "small",
          "big",
          "3",
          "エラー"
        ],
        "answer": 2,
        "explanation": "5>3はTrueなのでifブロックが実行され'big'が出力される。elseブロックは実行されない。"
      },
      {
        "id": 22,
        "question": "実行結果は？",
        "code": "lst = list(range(5))\nprint(lst)",
        "choices": [
          "[1, 2, 3, 4, 5]",
          "[0, 1, 2, 3, 4]",
          "(0, 1, 2, 3, 4)",
          "エラー"
        ],
        "answer": 2,
        "explanation": "range(5)は0から4までの整数を生成する。list()でリストに変換すると[0,1,2,3,4]。"
      },
      {
        "id": 23,
        "question": "実行結果は？",
        "code": "d = {}\nd['key'] = 'val'\nprint(len(d))",
        "choices": [
          "0",
          "1",
          "2",
          "エラー"
        ],
        "answer": 2,
        "explanation": "空の辞書にキー'key'を1つ追加したのでlen(d)は1。辞書のlen()はキーの数を返す。"
      },
      {
        "id": 24,
        "question": "実行結果は？",
        "code": "x = 'hello'\nprint(x.replace('l', 'r'))",
        "choices": [
          "herro",
          "helo",
          "herlo",
          "エラー"
        ],
        "answer": 1,
        "explanation": "replace(old, new)は文字列中の全てのoldをnewに置換する。'hello'の'l'は2箇所あるので'herro'になる。"
      },
      {
        "id": 25,
        "question": "実行結果は？",
        "code": "a = [1, 2, 3]\nb = a\nb.append(4)\nprint(len(a))",
        "choices": [
          "3",
          "4",
          "2",
          "エラー"
        ],
        "answer": 2,
        "explanation": "b=aは参照のコピー。bとaは同じリストオブジェクトを指すため、b.append(4)はaにも反映されlen(a)は4になる。"
      },
      {
        "id": 26,
        "question": "Pythonでコメントを書くのに使う記号は？",
        "code": "",
        "choices": [
          "//",
          "/*",
          "#",
          "--"
        ],
        "answer": 3,
        "explanation": "Pythonのコメントは#記号を使う。//はC言語やJavaScript、/*...*/はブロックコメント（Pythonにはない）。"
      },
      {
        "id": 27,
        "question": "実行結果は？",
        "code": "print(int('42'))",
        "choices": [
          "'42'",
          "42",
          "42.0",
          "エラー"
        ],
        "answer": 2,
        "explanation": "int()は文字列を整数に変換する。int('42')は整数の42を返す。クォートなしで42と表示される。"
      },
      {
        "id": 28,
        "question": "実行結果は？",
        "code": "s = 'abcdef'\nprint(s[2:4])",
        "choices": [
          "cde",
          "cd",
          "bcd",
          "de"
        ],
        "answer": 2,
        "explanation": "スライスs[2:4]は開始インデックス2を含み終了インデックス4を含まない。s[2]='c'、s[3]='d'なので'cd'。"
      },
      {
        "id": 29,
        "question": "実行結果は？",
        "code": "x = [1, 2, 3, 4, 5]\nprint(sum(x))",
        "choices": [
          "12",
          "15",
          "10",
          "エラー"
        ],
        "answer": 2,
        "explanation": "sum()はイテラブルの全要素の合計を返す。1+2+3+4+5=15。"
      },
      {
        "id": 30,
        "question": "実行結果は？",
        "code": "print(max(3, 1, 4, 1, 5))",
        "choices": [
          "4",
          "3",
          "5",
          "エラー"
        ],
        "answer": 3,
        "explanation": "max()は引数の中の最大値を返す。3,1,4,1,5の中で最大は5。"
      },
      {
        "id": 31,
        "question": "Pythonのリストで要素を末尾から削除するメソッドは？",
        "code": "",
        "choices": [
          "remove()",
          "delete()",
          "pop()",
          "cut()"
        ],
        "answer": 3,
        "explanation": "pop()は引数なしで呼ぶとリストの末尾要素を削除してその値を返す。remove()は値指定で削除、delete()/cut()は存在しない。"
      },
      {
        "id": 32,
        "question": "実行結果は？",
        "code": "x = 3\nwhile x > 0:\n    x -= 1\nprint(x)",
        "choices": [
          "1",
          "0",
          "-1",
          "エラー"
        ],
        "answer": 2,
        "explanation": "x=3から始まり、x>0の間x-=1を繰り返す。x=3→2→1→0となりx>0がFalseになりループ終了。最後のxは0。"
      },
      {
        "id": 33,
        "question": "実行結果は？",
        "code": "print(str(100))",
        "choices": [
          "100",
          "'100'",
          "エラー",
          "int"
        ],
        "answer": 1,
        "explanation": "str()は値を文字列に変換するが、print()で出力するとクォートなしで表示される。str(100)→'100'→print→100。"
      },
      {
        "id": 34,
        "question": "実行結果は？",
        "code": "lst = [1, 2, 3]\nprint(lst[1:3])",
        "choices": [
          "[1, 2]",
          "[2, 3]",
          "[1, 2, 3]",
          "エラー"
        ],
        "answer": 2,
        "explanation": "lst[1:3]はインデックス1から2（3は含まない）の要素。lst[1]=2、lst[2]=3なので[2,3]。"
      },
      {
        "id": 35,
        "question": "Pythonで等しくないことを確認する演算子は？",
        "code": "",
        "choices": [
          "!=",
          "<>",
          "=/=",
          "=/"
        ],
        "answer": 1,
        "explanation": "Pythonの不等価演算子は!=。<>はPython2の古い記法で現在は使えない。"
      },
      {
        "id": 36,
        "question": "実行結果は？",
        "code": "x = [1, 2, 3]\nprint(x.index(2))",
        "choices": [
          "0",
          "1",
          "2",
          "エラー"
        ],
        "answer": 2,
        "explanation": "index()は指定した値が最初に現れるインデックスを返す。リスト[1,2,3]で2のインデックスは1（0始まり）。"
      },
      {
        "id": 37,
        "question": "実行結果は？",
        "code": "print('  hello  '.strip())",
        "choices": [
          "'  hello  '",
          "'hello'",
          "hello",
          "エラー"
        ],
        "answer": 3,
        "explanation": "strip()は文字列の前後の空白を除去する。print()で出力するとクォートなしで'hello'ではなくhelloと表示される。"
      },
      {
        "id": 38,
        "question": "実行結果は？",
        "code": "a = {1, 2, 3}\nb = {2, 3, 4}\nprint(len(a & b))",
        "choices": [
          "1",
          "2",
          "3",
          "エラー"
        ],
        "answer": 2,
        "explanation": "&演算子はset（集合）の積集合（共通要素）を求める。{1,2,3}と{2,3,4}の共通要素は{2,3}なのでlen()は2。"
      },
      {
        "id": 39,
        "question": "Pythonで関数を定義するキーワードは？",
        "code": "",
        "choices": [
          "function",
          "def",
          "func",
          "define"
        ],
        "answer": 2,
        "explanation": "Pythonで関数を定義するにはdefキーワードを使う。functionはJavaScript、funcはGoなどの他言語のキーワード。"
      },
      {
        "id": 40,
        "question": "実行結果は？",
        "code": "x = [1, 2, 3]\nprint(x[::-1])",
        "choices": [
          "[1, 2, 3]",
          "[3, 2, 1]",
          "[3]",
          "エラー"
        ],
        "answer": 2,
        "explanation": "スライスの第3引数はステップ（刻み）。[::-1]はステップ-1で末尾から先頭へ走査するため、リストを逆順にする。"
      }
    ]
  },
  {
    "id": "python_mid",
    "title": "Python 中級",
    "description": "クラスと標準ライブラリを中心とした中級レベル問題集",
    "difficulty": "中級",
    "questions": [
      {
        "id": 1,
        "question": "次のコードの実行結果として正しいものを選びなさい。",
        "code": "def func(a=[]):\n    a.append(1)\n    return a\n\nprint(func())\nprint(func())",
        "choices": [
          "[1]\\n[1]",
          "[1]\\n[1, 1]",
          "[]\\n[]",
          "TypeError"
        ],
        "answer": 2,
        "explanation": "デフォルト引数のリストは関数定義時に一度だけ生成される。2回目の呼び出しでも同じリストオブジェクトが使われるため[1]→[1,1]になる（ミュータブルなデフォルト引数の罠）。"
      },
      {
        "id": 2,
        "question": "次のコードの実行結果として正しいものを選びなさい。",
        "code": "x = [[1], [2]]\ny = x.copy()\ny[0].append(10)\n\nprint(x)",
        "choices": [
          "[[1], [2]]",
          "[[1, 10], [2]]",
          "[[10], [2]]",
          "エラー"
        ],
        "answer": 2,
        "explanation": "list.copy()はシャローコピー（浅いコピー）。リスト自体は別オブジェクトだが、内部のサブリストは同じオブジェクトを参照するため、y[0]への変更はxにも反映される。"
      },
      {
        "id": 3,
        "question": "次のコードの出力として正しいものを選びなさい。",
        "code": "class A:\n    x = 10\n\na = A()\nb = A()\na.x = 20\n\nprint(b.x)",
        "choices": [
          "10",
          "20",
          "None",
          "AttributeError"
        ],
        "answer": 1,
        "explanation": "a.x=20はaのインスタンス変数を作成するだけで、クラス変数A.xには影響しない。bはインスタンス変数を持たないためクラス変数x=10を参照する。"
      },
      {
        "id": 4,
        "question": "クラス変数を定義する場所として正しいものを選びなさい。",
        "code": "",
        "choices": [
          "__init__",
          "クラスブロック直下",
          "インスタンス生成後",
          "main関数内"
        ],
        "answer": 2,
        "explanation": "クラス変数はクラスブロック直下（メソッドの外）に定義する。__init__内に定義するとインスタンス変数になる。"
      },
      {
        "id": 5,
        "question": "次のコードの出力として正しいものを選びなさい。",
        "code": "class A:\n    def __init__(self):\n        self.x = 10\n\na = A()\nprint(hasattr(a, 'x'))",
        "choices": [
          "False",
          "True",
          "None",
          "エラー"
        ],
        "answer": 2,
        "explanation": "hasattr(obj, name)はオブジェクトが指定した属性を持つかどうかを確認する。__init__でself.x=10が設定されているためTrueを返す。"
      },
      {
        "id": 6,
        "question": "継承元のコンストラクタを呼び出す方法として適切なものを選びなさい。",
        "code": "",
        "choices": [
          "parent()",
          "super().__init__()",
          "base()",
          "self.parent()"
        ],
        "answer": 2,
        "explanation": "super()は親クラスへの参照を返す組み込み関数。super().__init__()で親クラスのコンストラクタを呼び出せる。"
      },
      {
        "id": 7,
        "question": "特殊メソッドとして正しいものを選びなさい。",
        "code": "",
        "choices": [
          "init()",
          "_init_()",
          "__init__()",
          "constructor()"
        ],
        "answer": 3,
        "explanation": "Pythonの特殊メソッド（マジックメソッド）は前後をアンダースコア2つで囲む。__init__()はコンストラクタに相当する特殊メソッド。"
      },
      {
        "id": 8,
        "question": "次のコードの出力として正しいものを選びなさい。",
        "code": "class A:\n    def __str__(self):\n        return 'AAA'\n\nprint(A())",
        "choices": [
          "<A>",
          "AAA",
          "object",
          "エラー"
        ],
        "answer": 2,
        "explanation": "__str__()はprint()やstr()が呼ばれたときに使われる特殊メソッド。'AAA'を返すように定義しているのでAAAが表示される。"
      },
      {
        "id": 9,
        "question": "次のコードの出力として正しいものを選びなさい。",
        "code": "class A:\n    pass\n\na = A()\nprint(isinstance(a, object))",
        "choices": [
          "False",
          "True",
          "None",
          "エラー"
        ],
        "answer": 2,
        "explanation": "Pythonでは全てのクラスは暗黙的にobjectを継承している。そのためisinstance(a, object)は常にTrueになる。"
      },
      {
        "id": 10,
        "question": "次のうち組み込み例外クラスはどれか。",
        "code": "",
        "choices": [
          "ValueError",
          "NumberError",
          "DataError",
          "FileException"
        ],
        "answer": 1,
        "explanation": "ValueErrorはPython組み込みの例外クラスで、不正な値が渡されたときに発生する（例: int('abc')）。他の選択肢はPythonに存在しない。"
      },
      {
        "id": 11,
        "question": "次のコードの出力として正しいものを選びなさい。",
        "code": "try:\n    int('abc')\nexcept ValueError:\n    print('error')",
        "choices": [
          "abc",
          "error",
          "ValueError",
          "TypeError"
        ],
        "answer": 2,
        "explanation": "int('abc')はValueErrorを発生させる。except ValueErrorで捕捉されprint('error')が実行される。"
      },
      {
        "id": 12,
        "question": "finally節の説明として正しいものを選びなさい。",
        "code": "",
        "choices": [
          "正常終了時のみ実行される",
          "例外発生時のみ実行される",
          "必ず実行される",
          "exceptの代わりになる"
        ],
        "answer": 3,
        "explanation": "finally節はtry/exceptブロックの処理の結果にかかわらず（例外があってもなくても）必ず実行される。主にリソースの後片付けに使う。"
      },
      {
        "id": 13,
        "question": "with文の主な目的として正しいものを選びなさい。",
        "code": "",
        "choices": [
          "条件分岐",
          "リソース管理",
          "継承",
          "並列処理"
        ],
        "answer": 2,
        "explanation": "with文はコンテキストマネージャを使ったリソース管理に使う。ファイルをwith open()で開くと終了時に自動でclose()が呼ばれる。"
      },
      {
        "id": 14,
        "question": "enumerate()の役割として正しいものを選びなさい。",
        "code": "",
        "choices": [
          "要素にインデックスを付与する",
          "ソートする",
          "重複を削除する",
          "逆順にする"
        ],
        "answer": 1,
        "explanation": "enumerate()はイテラブルに0始まりのインデックスを付与して(index, value)のタプルで反復できるようにする関数。"
      },
      {
        "id": 15,
        "question": "zip()の役割として正しいものを選びなさい。",
        "code": "",
        "choices": [
          "ソートする",
          "要素をペアにする",
          "重複を削除する",
          "インデックスを付ける"
        ],
        "answer": 2,
        "explanation": "zip()は複数のイテラブルの対応する要素をタプルにまとめる関数。zip([1,2],['a','b'])→(1,'a'),(2,'b')。"
      },
      {
        "id": 16,
        "question": "次のコードの結果として正しいものを選びなさい。",
        "code": "list(zip([1, 2], ['a', 'b']))",
        "choices": [
          "[1,2,'a','b']",
          "[(1,'a'),(2,'b')]",
          "{1:'a',2:'b'}",
          "エラー"
        ],
        "answer": 2,
        "explanation": "zip([1,2],['a','b'])は対応する要素をペアにしたタプルを生成し、list()でリスト化すると[(1,'a'),(2,'b')]になる。"
      },
      {
        "id": 17,
        "question": "*argsの型として正しいものを選びなさい。",
        "code": "",
        "choices": [
          "list",
          "tuple",
          "dict",
          "set"
        ],
        "answer": 2,
        "explanation": "関数定義の*argsは可変長位置引数を受け取る。関数内でargsはtupleとして扱われる（リストではない）。"
      },
      {
        "id": 18,
        "question": "**kwargsの型として正しいものを選びなさい。",
        "code": "",
        "choices": [
          "tuple",
          "list",
          "dict",
          "set"
        ],
        "answer": 3,
        "explanation": "関数定義の**kwargsはキーワード引数を可変長で受け取る。関数内でkwargsはdict（辞書）として扱われる。"
      },
      {
        "id": 19,
        "question": "lambda式として正しいものを選びなさい。",
        "code": "",
        "choices": [
          "lambda x: x * 2",
          "lambda(x)=x*2",
          "lambda x -> x*2",
          "def lambda(x)"
        ],
        "answer": 1,
        "explanation": "Pythonのlambda式の構文は「lambda 引数: 式」。lambdaはキーワードなのでdef lambda()は構文エラー。->はPythonでは型ヒントに使う。"
      },
      {
        "id": 20,
        "question": "map()の戻り値として正しいものを選びなさい。",
        "code": "",
        "choices": [
          "list",
          "tuple",
          "mapオブジェクト",
          "generator"
        ],
        "answer": 3,
        "explanation": "map()はmapオブジェクト（遅延評価されるイテレータ）を返す。リストにしたい場合はlist()で変換する必要がある。"
      },
      {
        "id": 21,
        "question": "filter()の戻り値として正しいものを選びなさい。",
        "code": "",
        "choices": [
          "filterオブジェクト",
          "list",
          "bool",
          "set"
        ],
        "answer": 1,
        "explanation": "filter()はfilterオブジェクト（遅延評価されるイテレータ）を返す。map()と同様にlist()などで変換して使うことが多い。"
      },
      {
        "id": 22,
        "question": "次のコードの実行結果として正しいものを選びなさい。",
        "code": "list(filter(lambda x: x % 2 == 0, [1, 2, 3, 4]))",
        "choices": [
          "[1, 3]",
          "[2, 4]",
          "[1, 2, 3, 4]",
          "エラー"
        ],
        "answer": 2,
        "explanation": "filter()は条件がTrueの要素のみを残す。x%2==0（偶数）の条件なので[1,2,3,4]から偶数だけを取り出して[2,4]。"
      },
      {
        "id": 23,
        "question": "ジェネレータ関数を定義するキーワードとして正しいものを選びなさい。",
        "code": "",
        "choices": [
          "next",
          "iter",
          "yield",
          "generator"
        ],
        "answer": 2,
        "explanation": "yieldキーワードを含む関数はジェネレータ関数になる。呼び出すとジェネレータオブジェクトが返され、next()で値を一つずつ取り出せる。"
      },
      {
        "id": 24,
        "question": "next()の役割として正しいものを選びなさい。",
        "code": "",
        "choices": [
          "イテレータの次の値を取得する",
          "要素数を返す",
          "ソートする",
          "巻き戻す"
        ],
        "answer": 1,
        "explanation": "next()はイテレータから次の値を取り出す組み込み関数。全ての要素を使い切るとStopIteration例外が発生する。"
      },
      {
        "id": 25,
        "question": "collections.Counterの用途として適切なものを選びなさい。",
        "code": "",
        "choices": [
          "ソート",
          "出現回数の集計",
          "日付操作",
          "ファイル管理"
        ],
        "answer": 2,
        "explanation": "Counter()はハッシュ可能なオブジェクトのカウントを行う辞書のサブクラス。文字列やリストの各要素の出現回数を集計できる。"
      },
      {
        "id": 26,
        "question": "次のコードの実行結果として正しいものを選びなさい。",
        "code": "from collections import Counter\n\nCounter('banana')['a']",
        "choices": [
          "1",
          "2",
          "3",
          "4"
        ],
        "answer": 3,
        "explanation": "'banana'の各文字を数えると b:1, a:3, n:2。文字'a'は3回出現するのでCounter('banana')['a']は3。"
      },
      {
        "id": 27,
        "question": "collections.dequeの特徴として正しいものを選びなさい。",
        "code": "",
        "choices": [
          "両端から高速に追加・削除できる",
          "ソート専用である",
          "集合型である",
          "辞書型である"
        ],
        "answer": 1,
        "explanation": "deque（デック）はDouble-Ended Queueの略。先頭・末尾どちらからもO(1)で高速に追加・削除できる。通常のリストでは先頭操作がO(n)なのでキュー/スタックに向いている。"
      },
      {
        "id": 28,
        "question": "datetime.datetime.now()の戻り値の型として正しいものを選びなさい。",
        "code": "",
        "choices": [
          "dateオブジェクト",
          "datetimeオブジェクト",
          "str",
          "tuple"
        ],
        "answer": 2,
        "explanation": "datetime.datetime.now()は現在の日時を表すdatetimeオブジェクトを返す。日付のみはdateオブジェクト、時刻のみはtimeオブジェクト。"
      },
      {
        "id": 29,
        "question": "乱数生成を行う標準モジュールとして正しいものを選びなさい。",
        "code": "",
        "choices": [
          "statistics",
          "math",
          "random",
          "decimal"
        ],
        "answer": 3,
        "explanation": "randomモジュールは乱数生成に使う標準ライブラリ。random.randint()、random.choice()、random.shuffle()などが含まれる。"
      },
      {
        "id": 30,
        "question": "次のコードの実行結果として正しいものを選びなさい。",
        "code": "import math\n\nmath.sqrt(16)",
        "choices": [
          "4",
          "4.0",
          "16",
          "8"
        ],
        "answer": 2,
        "explanation": "math.sqrt()は平方根を浮動小数点数(float)で返す。√16=4だが戻り値はfloatなので4.0になる。"
      },
      {
        "id": 31,
        "question": "json.loads()の役割として正しいものを選びなさい。",
        "code": "",
        "choices": [
          "PythonオブジェクトをJSON文字列に変換する",
          "JSON文字列をPythonオブジェクトに変換する",
          "JSONファイルへ保存する",
          "JSONファイルを読み込む"
        ],
        "answer": 2,
        "explanation": "json.loads()（load string）はJSON文字列をPythonのdict/list等に変換する。逆（PythonオブジェクトをJSONに変換）はjson.dumps()。"
      },
      {
        "id": 32,
        "question": "os.getcwd()の役割として正しいものを選びなさい。",
        "code": "",
        "choices": [
          "カレントディレクトリを取得する",
          "ディレクトリを作成する",
          "ファイルを削除する",
          "パスを結合する"
        ],
        "answer": 1,
        "explanation": "os.getcwd()（get current working directory）は現在の作業ディレクトリのパスを文字列で返す。"
      },
      {
        "id": 33,
        "question": "re.findall()の戻り値として正しいものを選びなさい。",
        "code": "",
        "choices": [
          "tuple",
          "list",
          "dict",
          "set"
        ],
        "answer": 2,
        "explanation": "re.findall()はパターンにマッチした全ての文字列をリストで返す。マッチがなければ空リスト[]を返す。"
      },
      {
        "id": 34,
        "question": "正規表現 '\\d+' が表すものとして正しいものを選びなさい。",
        "code": "",
        "choices": [
          "英字1文字",
          "空白1文字",
          "数字1文字以上",
          "任意の文字1文字"
        ],
        "answer": 3,
        "explanation": "\\dは数字1文字にマッチする正規表現。+は1文字以上の繰り返し量指定子。\\d+は1文字以上の連続した数字にマッチする。"
      },
      {
        "id": 35,
        "question": "次のコードの実行結果として正しいものを選びなさい。",
        "code": "import re\n\nre.findall(r'\\d+', 'ab12cd345')",
        "choices": [
          "['1', '2', '3', '4', '5']",
          "['12', '345']",
          "['ab', 'cd']",
          "[]"
        ],
        "answer": 2,
        "explanation": "\\d+は連続した数字にマッチする。'ab12cd345'の数字の連続は'12'と'345'の2箇所なので['12', '345']。"
      },
      {
        "id": 36,
        "question": "itertools.product([1,2], ['a','b']) の説明として正しいものを選びなさい。",
        "code": "",
        "choices": [
          "和集合",
          "積集合",
          "直積",
          "差集合"
        ],
        "answer": 3,
        "explanation": "itertools.product()は複数のイテラブルの直積（デカルト積）を計算する。product([1,2],['a','b'])→(1,'a'),(1,'b'),(2,'a'),(2,'b')。"
      },
      {
        "id": 37,
        "question": "functools.reduce()の用途として正しいものを選びなさい。",
        "code": "",
        "choices": [
          "フィルタリング",
          "累積計算",
          "ソート",
          "逆順化"
        ],
        "answer": 2,
        "explanation": "reduce()はイテラブルの要素に関数を左から順に累積適用して1つの値にまとめる。例: reduce(f,[a,b,c])→f(f(a,b),c)。"
      },
      {
        "id": 38,
        "question": "次のコードの実行結果として正しいものを選びなさい。",
        "code": "from functools import reduce\n\nreduce(lambda x, y: x + y, [1, 2, 3, 4])",
        "choices": [
          "4",
          "10",
          "24",
          "TypeError"
        ],
        "answer": 2,
        "explanation": "reduce(lambda x,y: x+y, [1,2,3,4])は ((1+2)+3)+4 = 10 を計算する。積の場合は1×2×3×4=24だが今回は加算。"
      },
      {
        "id": 39,
        "question": "次のコードの実行結果として正しいものを選びなさい。",
        "code": "class A:\n    pass\n\nprint(issubclass(A, object))",
        "choices": [
          "False",
          "True",
          "None",
          "TypeError"
        ],
        "answer": 2,
        "explanation": "Pythonでは全クラスが暗黙的にobjectを継承している。issubclass(A, object)はAがobjectのサブクラスかを確認し、常にTrueになる。"
      },
      {
        "id": 40,
        "question": "次のコードの実行結果として正しいものを選びなさい。",
        "code": "class A:\n    x = []\n\na = A()\nb = A()\n\na.x.append(1)\n\nprint(b.x)",
        "choices": [
          "[]",
          "[1]",
          "None",
          "AttributeError"
        ],
        "answer": 2,
        "explanation": "xはクラス変数でリストオブジェクト。a.x.append(1)はリスト自体を変更する（a.x=...ではない）ため全インスタンスで共有されるクラス変数が変わり、b.xも[1]になる。"
      }
    ]
  },
  {
    "id": "python_advanced",
    "title": "Python 上級",
    "description": "Python3エンジニア認定基礎試験の出題傾向を意識した実践的な問題集",
    "difficulty": "上級",
    "questions": [
      {
        "id": 1,
        "question": "次のコードの実行結果として正しいものを選びなさい。",
        "code": "nums = [1, 2]\nnums.extend([3, 4])\nprint(nums)",
        "choices": [
          "[1, 2, [3, 4]]",
          "[1, 2, 3, 4]",
          "[3, 4]",
          "エラー"
        ],
        "answer": 2,
        "explanation": "extend()はリストを引数に取り、その要素を順に末尾へ追加する。append([3,4])では[3,4]が1要素として追加されるが、extend()では展開されて追加される。"
      },
      {
        "id": 2,
        "question": "リストの末尾に要素を1つ追加するメソッドはどれか。",
        "code": "",
        "choices": [
          "add()",
          "insert()",
          "append()",
          "extend()"
        ],
        "answer": 3,
        "explanation": "append()はリストの末尾に要素を1つ追加する。insert()は任意位置に挿入、extend()は複数要素を追加、add()はsetのメソッドでlistには存在しない。"
      },
      {
        "id": 3,
        "question": "次のコードの実行結果として正しいものを選びなさい。",
        "code": "d = {'a': 1}\nprint(d.get('b', 0))",
        "choices": [
          "None",
          "KeyError",
          "0",
          "\"0\""
        ],
        "answer": 3,
        "explanation": "dict.get(key, default)はキーが存在しない場合にdefault値を返す。キー'b'は存在しないのでデフォルト値0を返す。d['b']ではKeyErrorが発生するのとは異なる。"
      },
      {
        "id": 4,
        "question": "辞書のキー一覧を取得するメソッドはどれか。",
        "code": "",
        "choices": [
          "values()",
          "keys()",
          "items()",
          "get()"
        ],
        "answer": 2,
        "explanation": "keys()は辞書のキー一覧をdict_keys型で返す。values()は値一覧、items()はキーと値のペア一覧をそれぞれ返す。"
      },
      {
        "id": 5,
        "question": "集合型(set)の特徴として正しいものを選びなさい。",
        "code": "",
        "choices": [
          "重複を許す",
          "順序を保証する",
          "重複要素を持てない",
          "キーと値を持つ"
        ],
        "answer": 3,
        "explanation": "set型は重複した要素を持てない（同じ値を追加しても1つしか保持されない）。順序は保証されず（Python3.7以降のdictは順序保証あり）、キーと値を持つのはdict。"
      },
      {
        "id": 6,
        "question": "次のコードの実行結果として正しいものを選びなさい。",
        "code": "nums = [1,2,3,4]\nprint([x*x for x in nums if x % 2 == 0])",
        "choices": [
          "[1,4,9,16]",
          "[4,16]",
          "[2,4]",
          "[1,9]"
        ],
        "answer": 2,
        "explanation": "リスト内包表記でx%2==0（偶数）の条件を満たすxはnumsから2と4。それぞれの2乗は4と16なので[4,16]。"
      },
      {
        "id": 7,
        "question": "辞書内包表記として正しいものを選びなさい。",
        "code": "",
        "choices": [
          "{x:x*x for x in range(3)}",
          "[x:x*x for x in range(3)]",
          "(x:x*x for x in range(3))",
          "{x,x*x}"
        ],
        "answer": 1,
        "explanation": "辞書内包表記は{key:value for ...}の形式。{}でkey:valueの形式を使うと辞書になる。[]はリスト内包表記、()はジェネレータ式。"
      },
      {
        "id": 8,
        "question": "次のコードの実行結果として正しいものを選びなさい。",
        "code": "a = (1,2,3)\nprint(len(a))",
        "choices": [
          "2",
          "3",
          "4",
          "エラー"
        ],
        "answer": 2,
        "explanation": "タプル(1,2,3)の要素数は3。len()はリスト・タプル・文字列など様々なシーケンスに対して要素数を返す。"
      },
      {
        "id": 9,
        "question": "*argsで受け取った値の型として正しいものを選びなさい。",
        "code": "",
        "choices": [
          "list",
          "tuple",
          "dict",
          "set"
        ],
        "answer": 2,
        "explanation": "*argsは位置引数を可変長で受け取る。関数内ではtupleとして扱われる。listに似ているが変更不可のtupleであることに注意。"
      },
      {
        "id": 10,
        "question": "**kwargsで受け取った値の型として正しいものを選びなさい。",
        "code": "",
        "choices": [
          "tuple",
          "list",
          "dict",
          "set"
        ],
        "answer": 3,
        "explanation": "**kwargsはキーワード引数を可変長で受け取る。関数内ではdict（辞書）として扱われ、引数名がキー、引数値が値になる。"
      },
      {
        "id": 11,
        "question": "次のコードの実行結果として正しいものを選びなさい。",
        "code": "def func(a, b=10):\n    return a+b\n\nprint(func(5))",
        "choices": [
          "5",
          "10",
          "15",
          "エラー"
        ],
        "answer": 3,
        "explanation": "func(5)はa=5でb=10（デフォルト値）として呼び出される。a+b=5+10=15を返してprint()で出力する。"
      },
      {
        "id": 12,
        "question": "lambda式として正しいものを選びなさい。",
        "code": "",
        "choices": [
          "lambda x: x*2",
          "lambda(x)=x*2",
          "lambda x -> x*2",
          "def lambda(x)"
        ],
        "answer": 1,
        "explanation": "lambdaの構文は「lambda 引数: 式」。lambdaは予約語なのでdef lambda()は構文エラー。->はPythonでは戻り値の型ヒントに使い、lambda内では使えない。"
      },
      {
        "id": 13,
        "question": "次のコードの実行結果として正しいものを選びなさい。",
        "code": "nums=[1,2,3]\nprint(list(map(lambda x:x*2, nums)))",
        "choices": [
          "[1,2,3]",
          "[2,4,6]",
          "[1,4,9]",
          "エラー"
        ],
        "answer": 2,
        "explanation": "map()は各要素に関数を適用する。lambda x:x*2で各要素を2倍にするので[1,2,3]→[2,4,6]。list()でmapオブジェクトをリストに変換。"
      },
      {
        "id": 14,
        "question": "enumerate()の役割として正しいものを選びなさい。",
        "code": "",
        "choices": [
          "ソート",
          "インデックス付きで反復",
          "重複削除",
          "フィルタ"
        ],
        "answer": 2,
        "explanation": "enumerate()はイテラブルに0始まりのインデックスを付与して(index, value)のタプルで反復できるようにする。forループでインデックスと値を同時に使いたいときに便利。"
      },
      {
        "id": 15,
        "question": "zip()の説明として正しいものを選びなさい。",
        "code": "",
        "choices": [
          "要素をペアにする",
          "ソートする",
          "集合を作る",
          "逆順にする"
        ],
        "answer": 1,
        "explanation": "zip()は複数のイテラブルの対応する要素をタプルにまとめる。最も短いイテラブルの長さで終了する。"
      },
      {
        "id": 16,
        "question": "次のコードの実行結果として正しいものを選びなさい。",
        "code": "name = 'Python'\nprint(f'Hello {name}')",
        "choices": [
          "Hello name",
          "Hello Python",
          "{name}",
          "エラー"
        ],
        "answer": 2,
        "explanation": "f文字列（フォーマット文字列）では{}の中に変数名や式を書くと評価された値が埋め込まれる。f'Hello {name}'はnameの値'Python'が展開されて'Hello Python'になる。"
      },
      {
        "id": 17,
        "question": "文字列を小文字に変換するメソッドはどれか。",
        "code": "",
        "choices": [
          "upper()",
          "lower()",
          "title()",
          "capitalize()"
        ],
        "answer": 2,
        "explanation": "lower()は文字列の全文字を小文字に変換する。upper()は大文字、title()は各単語の先頭を大文字に、capitalize()は先頭文字のみ大文字にする。"
      },
      {
        "id": 18,
        "question": "次のコードの実行結果として正しいものを選びなさい。",
        "code": "s='abc'\nprint(s.replace('a','x'))",
        "choices": [
          "abc",
          "xbc",
          "axc",
          "エラー"
        ],
        "answer": 2,
        "explanation": "replace(old, new)は文字列中の全てのoldをnewに置換した新しい文字列を返す。'abc'の'a'を'x'に置換すると'xbc'。文字列はイミュータブルなので元の文字列は変わらない。"
      },
      {
        "id": 19,
        "question": "ジェネレータ関数で使用するキーワードはどれか。",
        "code": "",
        "choices": [
          "next",
          "iter",
          "yield",
          "generator"
        ],
        "answer": 3,
        "explanation": "yieldキーワードを含む関数はジェネレータ関数になる。yieldで値を一つ生成して処理を一時停止し、次にnext()が呼ばれると再開する。"
      },
      {
        "id": 20,
        "question": "next()の役割として正しいものを選びなさい。",
        "code": "",
        "choices": [
          "要素数取得",
          "次の値を取り出す",
          "ソート",
          "初期化"
        ],
        "answer": 2,
        "explanation": "next()はイテレータから次の値を一つ取り出す組み込み関数。全ての要素を使い切るとStopIteration例外が発生する。"
      },
      {
        "id": 21,
        "question": "次のコードの実行結果として正しいものを選びなさい。",
        "code": "class A:\n    x = 10\n\na = A()\nprint(a.x)",
        "choices": [
          "10",
          "None",
          "A",
          "エラー"
        ],
        "answer": 1,
        "explanation": "aはクラスAのインスタンス。インスタンス変数xがないため、クラス変数x=10を参照してprint(a.x)は10を出力する。"
      },
      {
        "id": 22,
        "question": "インスタンス変数を定義する場所として適切なものを選びなさい。",
        "code": "",
        "choices": [
          "__init__",
          "class直下",
          "import部",
          "main関数"
        ],
        "answer": 1,
        "explanation": "インスタンス変数はself.変数名の形で__init__メソッド内に定義するのが一般的。class直下に定義するとクラス変数になり全インスタンスで共有される。"
      },
      {
        "id": 23,
        "question": "継承を表す構文として正しいものを選びなさい。",
        "code": "",
        "choices": [
          "class B extends A:",
          "class B(A):",
          "class B:A",
          "inherit A"
        ],
        "answer": 2,
        "explanation": "Pythonの継承はclass 子クラス(親クラス):の構文。extendsはJavaやJavaScriptの構文。class B:Aは構文エラー。"
      },
      {
        "id": 24,
        "question": "親クラスのメソッドを呼び出す際に利用する関数として正しいものを選びなさい。",
        "code": "",
        "choices": [
          "parent()",
          "super()",
          "base()",
          "self.parent()"
        ],
        "answer": 2,
        "explanation": "super()は親クラス（スーパークラス）への参照を返す組み込み関数。super().メソッド名()で親クラスのメソッドを呼び出せる。"
      },
      {
        "id": 25,
        "question": "特殊メソッドとして正しいものを選びなさい。",
        "code": "",
        "choices": [
          "init()",
          "__init__()",
          "constructor()",
          "_init_"
        ],
        "answer": 2,
        "explanation": "Pythonの特殊メソッド（ダンダーメソッド）は前後をアンダースコア2つで囲む。__init__()はコンストラクタ。_init_（アンダースコア1つ）は特殊メソッドではない。"
      },
      {
        "id": 26,
        "question": "組み込み例外クラスとして正しいものを選びなさい。",
        "code": "",
        "choices": [
          "ValueError",
          "FileError",
          "NumberError",
          "DataError"
        ],
        "answer": 1,
        "explanation": "ValueErrorはPython組み込みの例外クラス。int('abc')など不正な値が渡されたときに発生する。FileError/NumberError/DataErrorはPythonに存在しない。"
      },
      {
        "id": 27,
        "question": "finally節の説明として正しいものを選びなさい。",
        "code": "",
        "choices": [
          "例外発生時のみ実行される",
          "正常終了時のみ実行される",
          "必ず実行される",
          "except節の代わりとなる"
        ],
        "answer": 3,
        "explanation": "finally節はtry/exceptブロックの結果に関わらず必ず実行される。ファイルのクローズやDB接続の解放など後片付け処理に使う。"
      },
      {
        "id": 28,
        "question": "with文の目的として最も適切なものを選びなさい。",
        "code": "",
        "choices": [
          "条件分岐",
          "リソース管理",
          "継承",
          "並列処理"
        ],
        "answer": 2,
        "explanation": "with文はコンテキストマネージャを使ったリソース管理に使う。with open('file')で開いたファイルはブロック終了時に自動的にclose()される。"
      },
      {
        "id": 29,
        "question": "次のコードの実行結果として正しいものを選びなさい。",
        "code": "import math\nprint(math.sqrt(9))",
        "choices": [
          "3",
          "3.0",
          "9",
          "エラー"
        ],
        "answer": 2,
        "explanation": "math.sqrt()は平方根を浮動小数点数(float)で返す。√9=3だが戻り値はfloatなので3.0になる。整数で返したい場合はint()で変換する。"
      },
      {
        "id": 30,
        "question": "乱数生成に使用する標準モジュールを選びなさい。",
        "code": "",
        "choices": [
          "statistics",
          "random",
          "decimal",
          "fractions"
        ],
        "answer": 2,
        "explanation": "randomモジュールは乱数生成の標準ライブラリ。random.randint()、random.random()、random.choice()などを提供する。statisticsは統計計算用。"
      },
      {
        "id": 31,
        "question": "次のコードの実行結果として正しいものを選びなさい。",
        "code": "from collections import Counter\n\nc = Counter('banana')\nprint(c['a'])",
        "choices": [
          "1",
          "2",
          "3",
          "4"
        ],
        "answer": 3,
        "explanation": "'banana'の各文字を数えると b:1, a:3, n:2。Counterは辞書のサブクラスで文字をキーとして出現回数を値に持つ。c['a']=3。"
      },
      {
        "id": 32,
        "question": "json.loads()の役割として正しいものを選びなさい。",
        "code": "",
        "choices": [
          "JSON文字列をPythonオブジェクトに変換する",
          "PythonオブジェクトをJSON文字列に変換する",
          "JSONファイルへ保存する",
          "JSONファイルを読み込む"
        ],
        "answer": 1,
        "explanation": "json.loads()（loads = load string）はJSON形式の文字列をPythonのdict/list等に変換する。Pythonオブジェクト→JSON文字列はjson.dumps()、ファイル操作はjson.load()/json.dump()。"
      },
      {
        "id": 33,
        "question": "os.getcwd()が返すものとして正しいものを選びなさい。",
        "code": "",
        "choices": [
          "カレントディレクトリ",
          "ホームディレクトリ",
          "Pythonのパス",
          "ファイル名"
        ],
        "answer": 1,
        "explanation": "os.getcwd()（get current working directory）はプロセスの現在の作業ディレクトリを文字列で返す。ホームディレクトリはos.path.expanduser('~')で取得できる。"
      },
      {
        "id": 34,
        "question": "次のコードの実行結果として正しいものを選びなさい。",
        "code": "import re\n\nprint(re.findall(r'\\d+', 'ab12cd34'))",
        "choices": [
          "['1', '2', '3', '4']",
          "['12', '34']",
          "['ab', 'cd']",
          "[]"
        ],
        "answer": 2,
        "explanation": "\\d+は1文字以上の連続した数字にマッチする。'ab12cd34'の数字の連続部分は'12'と'34'の2箇所なので['12', '34']になる。"
      },
      {
        "id": 35,
        "question": "ファイルを安全に扱うために推奨される構文を選びなさい。",
        "code": "",
        "choices": [
          "try",
          "lambda",
          "with",
          "global"
        ],
        "answer": 3,
        "explanation": "ファイル操作は`with open('file') as f:`を使うことが推奨される。withブロックを抜けると例外が発生してもclose()が自動的に呼ばれてファイルが安全に閉じられる。"
      },
      {
        "id": 36,
        "question": "モジュール全体を読み込む構文として正しいものを選びなさい。",
        "code": "",
        "choices": [
          "include math",
          "import math",
          "using math",
          "require math"
        ],
        "answer": 2,
        "explanation": "Pythonのモジュール読み込みにはimport文を使う。include(C言語)、using(C#)、require(Ruby/Node.js)は他言語の構文。"
      },
      {
        "id": 37,
        "question": "現在のモジュール名を表す特殊変数を選びなさい。",
        "code": "",
        "choices": [
          "__name__",
          "__main__",
          "__file__",
          "__module__"
        ],
        "answer": 1,
        "explanation": "__name__は現在のモジュール名を格納する特殊変数。スクリプトとして直接実行すると'__main__'になり、importされると実際のモジュール名になる。if __name__=='__main__':でよく使われる。"
      },
      {
        "id": 38,
        "question": "次のコードの実行結果として正しいものを選びなさい。",
        "code": "list(filter(lambda x: x > 2, [1, 2, 3, 4]))",
        "choices": [
          "[1, 2]",
          "[3, 4]",
          "[2, 3, 4]",
          "[1, 2, 3, 4]"
        ],
        "answer": 2,
        "explanation": "filter()はTrueを返す要素のみ残す。lambda x: x>2でx>2（3と4）のみが条件を満たすので[3,4]。"
      },
      {
        "id": 39,
        "question": "次のコードの実行結果として正しいものを選びなさい。",
        "code": "list(zip([1, 2], ['a', 'b']))",
        "choices": [
          "[1, 2, 'a', 'b']",
          "[(1, 'a'), (2, 'b')]",
          "{1: 'a', 2: 'b'}",
          "エラー"
        ],
        "answer": 2,
        "explanation": "zip()は複数のイテラブルの同じ位置の要素をタプルにまとめる。zip([1,2],['a','b'])→(1,'a'),(2,'b')をlist()でリスト化すると[(1,'a'),(2,'b')]。"
      },
      {
        "id": 40,
        "question": "次のコードの実行結果として正しいものを選びなさい。",
        "code": "from functools import reduce\n\nprint(reduce(lambda x, y: x + y, [1, 2, 3, 4]))",
        "choices": [
          "4",
          "10",
          "24",
          "エラー"
        ],
        "answer": 2,
        "explanation": "reduce()は左から順に関数を累積適用する。((1+2)+3)+4=10。全要素の積なら1×2×3×4=24だが、今回は加算なので10。"
      }
    ]
  },
  {
    "id": "python_advanced2",
    "title": "Python 上級2",
    "description": "Python3エンジニア認定基礎試験の出題傾向を意識した実践的な問題集その2",
    "difficulty": "上級",
    "questions": [
      {
        "id": 1,
        "question": "整数型を表すものはどれか。",
        "code": "",
        "choices": [
          "float",
          "int",
          "str",
          "bool"
        ],
        "answer": 2,
        "explanation": "Pythonの整数型はint。float（浮動小数点数）、str（文字列）、bool（真偽値）はそれぞれ別の型。boolはintのサブクラスだが整数型の代表はint。"
      },
      {
        "id": 2,
        "question": "次のコードの実行結果として正しいものはどれか。",
        "code": "print(type(3.14))",
        "choices": [
          "<class 'int'>",
          "<class 'str'>",
          "<class 'float'>",
          "<class 'bool'>"
        ],
        "answer": 3,
        "explanation": "3.14は小数なのでfloat型。type()はオブジェクトの型オブジェクトを返し、print()すると<class '型名'>の形式で表示される。"
      },
      {
        "id": 3,
        "question": "次のコードの実行結果として正しいものはどれか。",
        "code": "print(\"Py\" + \"thon\")",
        "choices": [
          "Py thon",
          "Python",
          "Py+thon",
          "エラー"
        ],
        "answer": 2,
        "explanation": "文字列同士の+演算子は文字列の連結を行う。\"Py\"+\"thon\"は\"Python\"になる。スペースなしで結合されるため\"Py thon\"にはならない。"
      },
      {
        "id": 4,
        "question": "次のコードの実行結果として正しいものはどれか。",
        "code": "print(10 // 3)",
        "choices": [
          "3.333",
          "3",
          "4",
          "1"
        ],
        "answer": 2,
        "explanation": "//は切り捨て除算（整数除算）。10÷3=3.333...の小数部を切り捨てて3を返す。通常の除算/なら3.3333...になる。"
      },
      {
        "id": 5,
        "question": "次のコードの実行結果として正しいものはどれか。",
        "code": "print(2 ** 3)",
        "choices": [
          "5",
          "6",
          "8",
          "9"
        ],
        "answer": 3,
        "explanation": "**はべき乗演算子。2**3は2の3乗（2×2×2）で8。2*3=6（掛け算）や2+3=5（足し算）とは異なる。"
      },
      {
        "id": 6,
        "question": "論理積を表す演算子はどれか。",
        "code": "",
        "choices": [
          "or",
          "and",
          "not",
          "xor"
        ],
        "answer": 2,
        "explanation": "andは論理積演算子で両方がTrueのときのみTrueを返す。orは論理和（どちらかがTrue）、notは否定。xorはPythonに演算子はなく^はビット排他的論理和。"
      },
      {
        "id": 7,
        "question": "代入演算子として正しいものはどれか。",
        "code": "",
        "choices": [
          "==",
          ":=",
          "=",
          "!="
        ],
        "answer": 3,
        "explanation": "=は代入演算子で变数に値を代入する。==は等値比較演算子、:=はPython3.8以降の代入式（セイウチ演算子）、!=は不等価演算子。"
      },
      {
        "id": 8,
        "question": "次のコードの実行結果として正しいものはどれか。",
        "code": "a = 5\na += 2\nprint(a)",
        "choices": [
          "5",
          "2",
          "7",
          "エラー"
        ],
        "answer": 3,
        "explanation": "+=は加算代入演算子。a+=2はa=a+2と同じ。a=5から2を加算してa=7になる。"
      },
      {
        "id": 9,
        "question": "False として評価されるものはどれか。",
        "code": "",
        "choices": [
          "\"False\"",
          "1",
          "[]",
          "\" \""
        ],
        "answer": 3,
        "explanation": "[]（空リスト）はFalsyな値。\"False\"（文字列は空でなければTruthy）、1（0以外の整数はTruthy）、\" \"（空白1文字はTruthy）はいずれもTrueとして評価される。"
      },
      {
        "id": 10,
        "question": "コメントを表す記号はどれか。",
        "code": "",
        "choices": [
          "//",
          "#",
          "/*",
          "--"
        ],
        "answer": 2,
        "explanation": "Pythonのコメントは#記号。#以降の行末までがコメントになる。//はC言語・JS、/*...*/はブロックコメント（Pythonにはない）、--はSQLのコメント。"
      },
      {
        "id": 11,
        "question": "次のコードの実行結果として正しいものはどれか。",
        "code": "print(len(\"Python\"))",
        "choices": [
          "5",
          "6",
          "7",
          "エラー"
        ],
        "answer": 2,
        "explanation": "'Python'はP,y,t,h,o,nの6文字。len()は文字列の文字数を返す。"
      },
      {
        "id": 12,
        "question": "次のコードの実行結果として正しいものはどれか。",
        "code": "print(abs(-8))",
        "choices": [
          "-8",
          "8",
          "0",
          "エラー"
        ],
        "answer": 2,
        "explanation": "abs()は絶対値を返す組み込み関数。abs(-8)は8。正の数にはそのまま返す。"
      },
      {
        "id": 13,
        "question": "「以上」を表す比較演算子はどれか。",
        "code": "",
        "choices": [
          ">",
          "<=",
          ">=",
          "=="
        ],
        "answer": 3,
        "explanation": ">=は「以上」（greater than or equal to）を表す比較演算子。>は「より大きい」、<=は「以下」、==は「等しい」。"
      },
      {
        "id": 14,
        "question": "次のコードの実行結果として正しいものはどれか。",
        "code": "print(5 == 5)",
        "choices": [
          "True",
          "False",
          "5",
          "エラー"
        ],
        "answer": 1,
        "explanation": "==は等値比較演算子。5==5はTrueを返す。=（代入）と==（比較）を混同しないよう注意。"
      },
      {
        "id": 15,
        "question": "文字列を整数へ変換する関数はどれか。",
        "code": "",
        "choices": [
          "str()",
          "float()",
          "int()",
          "chr()"
        ],
        "answer": 3,
        "explanation": "int()は文字列や浮動小数点数を整数に変換する。str()は文字列に変換、float()は浮動小数点数に変換、chr()はUnicodeコードポイントから文字に変換する。"
      },
      {
        "id": 16,
        "question": "次のコードの実行結果として正しいものはどれか。",
        "code": "print(bool(0))",
        "choices": [
          "True",
          "False",
          "0",
          "エラー"
        ],
        "answer": 2,
        "explanation": "0はFalsyな値。bool(0)はFalseを返す。0以外の整数はTruthy（bool(1)はTrue）。空文字列、空リスト、NoneもFalsy。"
      },
      {
        "id": 17,
        "question": "次のコードの実行結果として正しいものはどれか。",
        "code": "print(round(3.6))",
        "choices": [
          "3",
          "3.6",
          "4",
          "5"
        ],
        "answer": 3,
        "explanation": "round()は四捨五入を行う。3.6は0.5以上の小数部なので繰り上がり4になる。ただし銀行丸め（偶数丸め）の場合round(2.5)=2になる点に注意。"
      },
      {
        "id": 18,
        "question": "次のコードの実行結果として正しいものはどれか。",
        "code": "print(max([2, 5, 1]))",
        "choices": [
          "1",
          "2",
          "5",
          "エラー"
        ],
        "answer": 3,
        "explanation": "max()はイテラブルや引数の中の最大値を返す。max([2,5,1])はリストの中の最大値5を返す。"
      },
      {
        "id": 19,
        "question": "複数行文字列を記述するために使用できるものはどれか。",
        "code": "",
        "choices": [
          "'''",
          "##",
          "//",
          "::"
        ],
        "answer": 1,
        "explanation": "Pythonでは'''（シングルクォート3つ）または\"\"\"（ダブルクォート3つ）で複数行にわたる文字列を定義できる。ドキュメント文字列（docstring）にも使われる。"
      },
      {
        "id": 20,
        "question": "文字列フォーマットに使用できるメソッドはどれか。",
        "code": "",
        "choices": [
          "format()",
          "build()",
          "make()",
          "create()"
        ],
        "answer": 1,
        "explanation": "str.format()は文字列の{}プレースホルダーに値を埋め込むフォーマットメソッド。\"Hello {}\".format('World')→'Hello World'。現在はf文字列も広く使われる。"
      },
      {
        "id": 21,
        "question": "次のコードの実行結果として正しいものはどれか。",
        "code": "print(\"abc\".upper())",
        "choices": [
          "abc",
          "ABC",
          "Abc",
          "エラー"
        ],
        "answer": 2,
        "explanation": "upper()は文字列の全文字を大文字に変換するメソッド。\"abc\"→\"ABC\"。元の文字列は変更されない（イミュータブル）。"
      },
      {
        "id": 22,
        "question": "リストを表す記号はどれか。",
        "code": "",
        "choices": [
          "()",
          "[]",
          "{}",
          "<>"
        ],
        "answer": 2,
        "explanation": "[]はリストを表す。()はタプルや関数呼び出し、{}は辞書またはセット、<>はPythonでは使われない（比較演算子ではない）。"
      },
      {
        "id": 23,
        "question": "次のコードの実行結果として正しいものはどれか。",
        "code": "a = [1, 2]\na.append(3)\nprint(a)",
        "choices": [
          "[1, 2]",
          "[3]",
          "[1, 2, 3]",
          "エラー"
        ],
        "answer": 3,
        "explanation": "append()はリストの末尾に要素を追加する（破壊的操作）。[1,2]に3を追加して[1,2,3]になる。"
      },
      {
        "id": 24,
        "question": "辞書のキー一覧を取得するメソッドはどれか。",
        "code": "",
        "choices": [
          "keys()",
          "values()",
          "items()",
          "get()"
        ],
        "answer": 1,
        "explanation": "keys()は辞書の全キーをdict_keys型で返す。values()は全値、items()は(キー,値)のペア一覧、get()は指定キーの値を返す。"
      },
      {
        "id": 25,
        "question": "重複した要素を保持しないデータ型はどれか。",
        "code": "",
        "choices": [
          "list",
          "tuple",
          "set",
          "dict"
        ],
        "answer": 3,
        "explanation": "set（集合型）は重複を許さない。{1,1,2,3}={1,2,3}になる。list/tupleは重複あり、dictはキーが重複不可だが値は重複可。"
      },
      {
        "id": 26,
        "question": "タプルの特徴として正しいものはどれか。",
        "code": "",
        "choices": [
          "要素を追加できる",
          "内容を変更できない",
          "キーと値を持つ",
          "重複した要素を持てない"
        ],
        "answer": 2,
        "explanation": "タプルはイミュータブル（変更不可）なシーケンス型。一度作成した後は要素の追加・変更・削除ができない。辞書のキーとして使える（リストはキーにできない）。"
      },
      {
        "id": 27,
        "question": "次のコードの実行結果として正しいものはどれか。",
        "code": "a = {\"x\": 1}\nprint(a[\"x\"])",
        "choices": [
          "x",
          "0",
          "1",
          "エラー"
        ],
        "answer": 3,
        "explanation": "辞書のキー\"x\"に対応する値は1。a[\"x\"]で値1にアクセスできる。\"x\"（キー名）ではなく値の1が返る。"
      },
      {
        "id": 28,
        "question": "辞書のキーが存在しない場合でも安全に値を取得できるメソッドはどれか。",
        "code": "",
        "choices": [
          "get()",
          "find()",
          "index()",
          "pop()"
        ],
        "answer": 1,
        "explanation": "get(key, default=None)はキーが存在しない場合にKeyErrorではなくNone（またはデフォルト値）を返す安全なアクセス方法。find()はstrのメソッド、index()はリストのメソッド。"
      },
      {
        "id": 29,
        "question": "条件分岐で使用するキーワードはどれか。",
        "code": "",
        "choices": [
          "switch",
          "case",
          "if",
          "when"
        ],
        "answer": 3,
        "explanation": "Pythonの条件分岐はif/elif/else。switchはC言語・JavaScriptの構文（Python3.10以降はmatch/caseがある）、whenはRubyなど他言語のキーワード。"
      },
      {
        "id": 30,
        "question": "繰り返し処理に使用する文はどれか。",
        "code": "",
        "choices": [
          "repeat",
          "for",
          "loop",
          "iterate"
        ],
        "answer": 2,
        "explanation": "Pythonの繰り返し処理はforまたはwhile。for文はイテラブルの各要素に対して処理を繰り返す。repeat/loop/iterateはPythonのキーワードではない。"
      },
      {
        "id": 31,
        "question": "次のコードを実行したとき、最後に出力される値はどれか。",
        "code": "for i in range(3):\n    print(i)",
        "choices": [
          "1",
          "2",
          "3",
          "0"
        ],
        "answer": 2,
        "explanation": "range(3)は0,1,2を生成する。順番に0,1,2と出力されるので最後に出力される値は2。range(3)は3を含まない点に注意。"
      },
      {
        "id": 32,
        "question": "関数を定義するためのキーワードはどれか。",
        "code": "",
        "choices": [
          "function",
          "func",
          "def",
          "define"
        ],
        "answer": 3,
        "explanation": "Pythonで関数を定義するにはdefキーワードを使う。functionはJavaScript/PHP、funcはGo/Swift、defineはLispなど他言語のキーワード。"
      },
      {
        "id": 33,
        "question": "関数から値を返すためのキーワードはどれか。",
        "code": "",
        "choices": [
          "break",
          "yield",
          "return",
          "pass"
        ],
        "answer": 3,
        "explanation": "returnは関数から値を返すキーワード。breakはループ脱出、yieldはジェネレータで値を生成、passは何もしない文。"
      },
      {
        "id": 34,
        "question": "何も処理を行わない文として使用されるキーワードはどれか。",
        "code": "",
        "choices": [
          "continue",
          "break",
          "pass",
          "stop"
        ],
        "answer": 3,
        "explanation": "passは何もしないプレースホルダー文。空のクラス定義やif文の中に構文上必要な時に使う。continueは次のループへ、breakはループ脱出、stopはPythonのキーワードではない。"
      },
      {
        "id": 35,
        "question": "クラスを定義するためのキーワードはどれか。",
        "code": "",
        "choices": [
          "class",
          "object",
          "struct",
          "type"
        ],
        "answer": 1,
        "explanation": "Pythonでクラスを定義するにはclassキーワードを使う。objectはクラスの基底クラス、structはCやRustのキーワード、type()は型を確認する組み込み関数。"
      },
      {
        "id": 36,
        "question": "次のクラス A のインスタンスを生成する方法として正しいものはどれか。",
        "code": "class A:\n    pass",
        "choices": [
          "A.new()",
          "new A()",
          "A()",
          "class A()"
        ],
        "answer": 3,
        "explanation": "Pythonではクラス名に()を付けて呼び出すとインスタンスが生成される。A()はA.__init__()を呼び出してインスタンスを作る。newキーワードを使うのはJava/C++などの他言語。"
      },
      {
        "id": 37,
        "question": "平方根などの数学関数を利用する際によく使用される標準ライブラリはどれか。",
        "code": "",
        "choices": [
          "random",
          "math",
          "os",
          "sys"
        ],
        "answer": 2,
        "explanation": "mathモジュールは数学関数を提供する標準ライブラリ。math.sqrt()（平方根）、math.pi（円周率）、math.floor()（切り捨て）などを含む。"
      },
      {
        "id": 38,
        "question": "乱数を生成するために利用する標準ライブラリはどれか。",
        "code": "",
        "choices": [
          "time",
          "pathlib",
          "random",
          "csv"
        ],
        "answer": 3,
        "explanation": "randomモジュールは乱数生成の標準ライブラリ。random.randint()、random.random()、random.choice()、random.shuffle()などを提供する。"
      },
      {
        "id": 39,
        "question": "現在の作業ディレクトリの取得など、OSに関する機能を提供する標準ライブラリはどれか。",
        "code": "",
        "choices": [
          "os",
          "math",
          "statistics",
          "decimal"
        ],
        "answer": 1,
        "explanation": "osモジュールはOS（オペレーティングシステム）に依存する機能を提供する。os.getcwd()（現在ディレクトリ取得）、os.makedirs()（ディレクトリ作成）、os.path（パス操作）などを含む。"
      },
      {
        "id": 40,
        "question": "次のコードの実行結果としてあり得るものはどれか。",
        "code": "import random\n\nprint(random.randint(1, 3))",
        "choices": [
          "0",
          "4",
          "2",
          "3.5"
        ],
        "answer": 3,
        "explanation": "random.randint(a, b)はa以上b以下（両端含む）の整数をランダムに返す。randint(1,3)なら1、2、3のいずれか。0は範囲外、4は範囲外、3.5は整数でないため、選択肢の中で正しいのは2のみ。"
      }
    ]
  },
  {
    "id": "python_advanced3",
    "title": "Python 上級3",
    "description": "Python3エンジニア認定基礎試験の出題傾向を意識した実践的な問題集その3",
    "difficulty": "上級",
    "questions": [
      {
        "id": 1,
        "question": "Pythonのインタプリタの対話環境で、直前の式の評価結果が自動的に格納される変数は？",
        "code": "",
        "choices": [
          "res",
          "_",
          "last",
          "ans"
        ],
        "answer": 2,
        "explanation": "対話モードでは、最後に評価された式の結果が特別な変数「_」に格納されます。"
      },
      {
        "id": 2,
        "question": "以下の出力結果として正しいものは？",
        "code": "print(3 * 'un' + 'ium')",
        "choices": [
          "3unium",
          "unununium",
          "ununiun",
          "エラー"
        ],
        "answer": 2,
        "explanation": "文字列の乗算は、指定した回数だけ文字列を繰り返します。"
      },
      {
        "id": 3,
        "question": "リストに対するスライス操作 `a[:2]` の結果は？",
        "code": "a = [10, 20, 30, 40]",
        "choices": [
          "[10]",
          "[10, 20]",
          "[20, 30]",
          "[10, 20, 30]"
        ],
        "answer": 2,
        "explanation": "スライスの終了インデックスは含まれないため、インデックス0と1の要素が抽出されます。"
      },
      {
        "id": 4,
        "question": "リストの `append()` メソッドの説明として正しいものは？",
        "code": "",
        "choices": [
          "リストの末尾に要素を追加する",
          "リストの先頭に要素を追加する",
          "別のリストを結合する",
          "指定位置に要素を挿入する"
        ],
        "answer": 1,
        "explanation": "append()はリストの末尾に要素を一つ追加します。"
      },
      {
        "id": 5,
        "question": "リスト内包表記 `[x*2 for x in range(3)]` の実行結果は？",
        "code": "",
        "choices": [
          "[0, 2, 4]",
          "[2, 4, 6]",
          "[0, 1, 2]",
          "[1, 2, 3]"
        ],
        "answer": 1,
        "explanation": "range(3)は0, 1, 2を生成します。それぞれを2倍したリストが作成されます。"
      },
      {
        "id": 6,
        "question": "タプルの特徴として正しいものは？",
        "code": "",
        "choices": [
          "要素の追加・削除が可能",
          "ミュータブルである",
          "イミュータブル（変更不可能）である",
          "要素を一つしか持てない"
        ],
        "answer": 3,
        "explanation": "タプルは一度作成すると要素の変更ができないイミュータブルなシーケンスです。"
      },
      {
        "id": 7,
        "question": "辞書のキーとして利用できないものは？",
        "code": "",
        "choices": [
          "整数",
          "文字列",
          "タプル",
          "リスト"
        ],
        "answer": 4,
        "explanation": "辞書のキーにはハッシュ化可能な（変更不可能な）型である必要があります。リストは変更可能なためキーにできません。"
      },
      {
        "id": 8,
        "question": "set（集合）型の説明として正しいものは？",
        "code": "",
        "choices": [
          "順序が保証される",
          "重複する要素を保持できる",
          "要素の重複を許さない",
          "インデックスでアクセスできる"
        ],
        "answer": 3,
        "explanation": "集合は重複を排除し、順序を持たないデータの集まりです。"
      },
      {
        "id": 9,
        "question": "if文で `elif` を使う目的は？",
        "code": "",
        "choices": [
          "例外処理のため",
          "条件分岐を連続して行うため",
          "ループを中断するため",
          "変数を初期化するため"
        ],
        "answer": 2,
        "explanation": "elifは「そうでなく、もし〜なら」という複数の条件分岐を連ねる際に使用します。"
      },
      {
        "id": 10,
        "question": "forループで要素のインデックスと値を同時に取得する関数は？",
        "code": "",
        "choices": [
          "range()",
          "enumerate()",
          "zip()",
          "index()"
        ],
        "answer": 2,
        "explanation": "enumerate()を使うと、ループ内でカウンタ（インデックス）と値の両方を取り出せます。"
      },
      {
        "id": 11,
        "question": "range関数 `range(1, 6, 2)` が生成する値は？",
        "code": "",
        "choices": [
          "1, 2, 3, 4, 5",
          "1, 3, 5",
          "1, 4",
          "2, 4, 6"
        ],
        "answer": 2,
        "explanation": "range(start, stop, step)は、1から始まり2ずつ増えて6未満までの値（1, 3, 5）を生成します。"
      },
      {
        "id": 12,
        "question": "関数の引数で、デフォルト値を持つ引数の定義として正しいものは？",
        "code": "",
        "choices": [
          "def func(a=1, b):",
          "def func(a, b=1):",
          "def func(a=1, b=2):",
          "どれでもよい"
        ],
        "answer": 2,
        "explanation": "デフォルト引数は、必須の引数の後ろに記述しなければなりません。"
      },
      {
        "id": 13,
        "question": "キーワード引数での呼び出し方として正しいものは？",
        "code": "def greet(name, msg='Hello'):",
        "choices": [
          "greet(msg='Hi', 'John')",
          "greet('John', name='Bob')",
          "greet(name='John', msg='Hi')",
          "greet('John', 'Bob', name='Hi')"
        ],
        "answer": 3,
        "explanation": "キーワード引数は、名前を指定して値を渡します。キーワード引数の後ろに位置引数を置くことはできません。"
      },
      {
        "id": 14,
        "question": "ラムダ関数 `lambda x: x * 2` の説明として正しいものは？",
        "code": "",
        "choices": [
          "複数の文を実行できる",
          "名前を持つ関数を定義する",
          "名前を持たない小さな関数を作成する",
          "クラスを定義する"
        ],
        "answer": 3,
        "explanation": "lambdaは名前を持たない、一行で記述可能な小さな関数を作成します。"
      },
      {
        "id": 15,
        "question": "リストの `pop(i)` メソッドは何をするか？",
        "code": "",
        "choices": [
          "インデックス i の要素を削除して返す",
          "要素 i を追加する",
          "リストをソートする",
          "リストを空にする"
        ],
        "answer": 1,
        "explanation": "pop(i)は指定したインデックスの要素を取り出し、削除します。"
      },
      {
        "id": 16,
        "question": "リストの `clear()` メソッドの動作は？",
        "code": "",
        "choices": [
          "リストの最初の要素を削除する",
          "リストの最後の要素を削除する",
          "リストの全要素を削除する",
          "リストをコピーする"
        ],
        "answer": 3,
        "explanation": "clear()はリストを空にします。"
      },
      {
        "id": 17,
        "question": "辞書の `items()` メソッドが返すものは？",
        "code": "",
        "choices": [
          "キーのリスト",
          "値のリスト",
          "キーと値のペアのビュー",
          "辞書の長さ"
        ],
        "answer": 3,
        "explanation": "items()は辞書のキーと値のペアをタプルとして扱うビューオブジェクトを返します。"
      },
      {
        "id": 18,
        "question": "シーケンスの要素を連結するための演算子は？",
        "code": "",
        "choices": [
          "+",
          "*",
          "/",
          "%"
        ],
        "answer": 1,
        "explanation": "+演算子を用いると、リストやタプル、文字列を連結できます。"
      },
      {
        "id": 19,
        "question": "条件式 `not (a and b)` と等価なものは？",
        "code": "",
        "choices": [
          "not a or not b",
          "not a and not b",
          "a or b",
          "not a and b"
        ],
        "answer": 1,
        "explanation": "ド・モルガンの法則により、`not (A and B)` は `not A or not B` と等価です。"
      },
      {
        "id": 20,
        "question": "制御構造の中で、ループを即座に終了するキーワードは？",
        "code": "",
        "choices": [
          "continue",
          "pass",
          "break",
          "return"
        ],
        "answer": 3,
        "explanation": "breakはループ処理をその場で終了させます。"
      },
      {
        "id": 21,
        "question": "モジュールをインポートする `from math import *` の意味は？",
        "code": "",
        "choices": [
          "mathモジュールをmathという名前で使う",
          "math内の全てを現在の名前空間にインポートする",
          "mathモジュールをロードするが名前空間には影響しない",
          "mathモジュールの特定の関数だけをインポートする"
        ],
        "answer": 2,
        "explanation": "import * は、モジュール内のすべての公開属性を直接インポートします。"
      },
      {
        "id": 22,
        "question": "`sys.path` がリストとして保持しているものは？",
        "code": "",
        "choices": [
          "現在開いているファイル名",
          "モジュールの探索パス",
          "環境変数",
          "コマンドの履歴"
        ],
        "answer": 2,
        "explanation": "sys.pathには、モジュールを検索するディレクトリのパスが格納されています。"
      },
      {
        "id": 23,
        "question": "f-stringにおいて、値を右寄せで幅10にする記述は？",
        "code": "val = 10",
        "choices": [
          "f'{val:10}'",
          "f'{val:<10}'",
          "f'{val:>10}'",
          "f'{val:^10}'"
        ],
        "answer": 3,
        "explanation": "> は右寄せを指定するフォーマット指定子です。"
      },
      {
        "id": 24,
        "question": "ファイルを開くときのモード 'w' の意味は？",
        "code": "",
        "choices": [
          "読み込み用",
          "書き込み用（上書き）",
          "追記用",
          "バイナリモード"
        ],
        "answer": 2,
        "explanation": "w は write の略で、ファイルが存在する場合は上書き、存在しない場合は新規作成します。"
      },
      {
        "id": 25,
        "question": "例外処理で、複数の例外を捕捉する構文として正しいものは？",
        "code": "",
        "choices": [
          "except (TypeError, ValueError):",
          "except TypeError or ValueError:",
          "except TypeError, ValueError:",
          "try except TypeError, ValueError"
        ],
        "answer": 1,
        "explanation": "複数の例外をキャッチするには、括弧で囲んだタプルで例外を指定します。"
      },
      {
        "id": 26,
        "question": "ユーザー定義例外を作成するために継承すべきクラスは？",
        "code": "",
        "choices": [
          "BaseException",
          "Exception",
          "Error",
          "SystemExit"
        ],
        "answer": 2,
        "explanation": "ユーザー定義の例外は、Exceptionクラスを継承するのが一般的です。"
      },
      {
        "id": 27,
        "question": "クラス定義において、メソッドの第一引数に慣習として使われる名前は？",
        "code": "",
        "choices": [
          "this",
          "self",
          "me",
          "cls"
        ],
        "answer": 2,
        "explanation": "インスタンスメソッドの第一引数には、慣習的に self が使用されます。"
      },
      {
        "id": 28,
        "question": "クラス変数とインスタンス変数の説明として正しいものは？",
        "code": "",
        "choices": [
          "クラス変数はインスタンス間で共有される",
          "インスタンス変数はクラス間で共有される",
          "クラス変数はインスタンス毎に異なる",
          "インスタンス変数は定義できない"
        ],
        "answer": 1,
        "explanation": "クラス定義内で定義されたクラス変数は、そのクラスから作られた全インスタンスで共有されます。"
      },
      {
        "id": 29,
        "question": "標準ライブラリ `math.floor(3.9)` の結果は？",
        "code": "",
        "choices": [
          "3.0",
          "4.0",
          "3",
          "4"
        ],
        "answer": 3,
        "explanation": "floorは小数点以下を切り捨て、整数を返します。"
      },
      {
        "id": 30,
        "question": "ファイルパスの操作で使われるモジュールは？",
        "code": "",
        "choices": [
          "os.path",
          "math",
          "re",
          "sys"
        ],
        "answer": 1,
        "explanation": "os.path はファイルパスの分解や結合などを行うためのモジュールです。"
      },
      {
        "id": 31,
        "question": "正規表現で `re.findall()` は何を返すか？",
        "code": "",
        "choices": [
          "マッチしたオブジェクト",
          "マッチした文字列のリスト",
          "マッチした位置",
          "ブール値"
        ],
        "answer": 2,
        "explanation": "findall() は、パターンにマッチしたすべての文字列をリストとして返します。"
      },
      {
        "id": 32,
        "question": "`datetime.date.today()` の戻り値の型は？",
        "code": "",
        "choices": [
          "datetime型",
          "date型",
          "str型",
          "time型"
        ],
        "answer": 2,
        "explanation": "date.today() は date オブジェクトを返します。"
      },
      {
        "id": 33,
        "question": "仮想環境を作成する標準的なコマンドは？",
        "code": "",
        "choices": [
          "python -m venv <name>",
          "pip install venv",
          "create-env <name>",
          "venv start"
        ],
        "answer": 1,
        "explanation": "Python 3.3以降、標準で venv モジュールが提供されています。"
      },
      {
        "id": 34,
        "question": "パッケージとして認識されるディレクトリに必要なファイルは？",
        "code": "",
        "choices": [
          "__init__.py",
          "main.py",
          "package.py",
          "config.py"
        ],
        "answer": 1,
        "explanation": "__init__.py が存在することで、そのディレクトリはPythonパッケージとして扱われます。"
      },
      {
        "id": 35,
        "question": "リストの `sort()` メソッドの説明は？",
        "code": "",
        "choices": [
          "新しいリストを返す",
          "元のリストを昇順に並べ替える",
          "元のリストを逆順にする",
          "エラーを返す"
        ],
        "answer": 2,
        "explanation": "sort()メソッドはリストを破壊的に（その場で）昇順に並べ替えます。"
      },
      {
        "id": 36,
        "question": "辞書の `get(key, default)` メソッドの利点は？",
        "code": "",
        "choices": [
          "キーが存在しない場合にエラーにならない",
          "キーを追加できる",
          "辞書をコピーする",
          "値を削除する"
        ],
        "answer": 1,
        "explanation": "get()メソッドはキーが存在しない場合にNoneまたは指定したデフォルト値を返すため、KeyErrorを回避できます。"
      },
      {
        "id": 37,
        "question": "try...except...finally の finally ブロックはいつ実行される？",
        "code": "",
        "choices": [
          "例外発生時のみ",
          "例外が起きなかった時のみ",
          "例外の有無に関わらず実行される",
          "exceptブロックの後に実行される"
        ],
        "answer": 3,
        "explanation": "finallyブロックは、tryブロックの終了後、例外の発生有無に関わらず必ず実行されます。"
      },
      {
        "id": 38,
        "question": "文字列の `split()` メソッドの戻り値は？",
        "code": "'a,b,c'.split(',')",
        "choices": [
          "['a', 'b', 'c']",
          "'abc'",
          "('a', 'b', 'c')",
          "('a,b,c')"
        ],
        "answer": 1,
        "explanation": "split()は指定した区切り文字で文字列を分割し、リストを返します。"
      },
      {
        "id": 39,
        "question": "PEP 8において、インデントの推奨は？",
        "code": "",
        "choices": [
          "タブ1つ",
          "スペース2つ",
          "スペース4つ",
          "スペース8つ"
        ],
        "answer": 3,
        "explanation": "PEP 8ではインデントに1レベルあたり4スペースを使用することが推奨されています。"
      },
      {
        "id": 40,
        "question": "以下の `zip` の実行結果はどうなるか？",
        "code": "list(zip(['a', 'b'], [1, 2]))",
        "choices": [
          "['a', 'b', 1, 2]",
          "[('a', 1), ('b', 2)]",
          "[('a', 'b'), (1, 2)]",
          "エラー"
        ],
        "answer": 2,
        "explanation": "zipは各シーケンスの要素をまとめたタプルのイテレータを作成します。"
      }
    ]
  }
];
