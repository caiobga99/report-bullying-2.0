<?php

namespace App\Http\Controllers;

use App\Models\User;
use Crypt;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;

class UsuarioController extends Controller
{
    /**
     * Display a listing of the resource.
     */

    public function index(Request $request)
    {

        $query = User::withCount(['denuncias', 'denuncias as total_comentarios' => function ($query) {
            $query->select(DB::raw('coalesce(count(comentarios.id_comentario), 0) as total_comentarios'))
                ->leftJoin('comentarios', 'denuncias.id_denuncia', '=', 'comentarios.id_denuncia');
        }])->select('id_usuario', 'email', 'nome', 'RA', 'tipo_usuario', 'image', 'created_at', 'updated_at');
        $totalUsers = $query->count();
        // Verifica se há um termo de busca enviado na requisição
        if ($request->has('searchTerm')) {
            $searchTerm = $request->input('searchTerm');
            $query->where(function ($query) use ($searchTerm) {
                $query->where('email', 'LIKE', "%$searchTerm%")
                    ->orWhere('nome', 'LIKE', "%$searchTerm%")
                    ->orWhere('RA', 'LIKE', "%$searchTerm%")
                    ->orWhere('id_usuario', $searchTerm);
            });
        }

        $usuarios = $query->paginate(10);
        // isso faz o retorno dos usuarios, com a quantidade de denuncias/comentarios realizados
        // Removendo o campo 'denuncias' do resultado
        // $usuarios->each(function ($usuario) {
        //     unset($usuario->denuncias);
        // });
        return response()->json([
            "total_usuarios" => $totalUsers,
            "users" => $usuarios
        ]);
    }


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //$request->validate([
        //     'name' => 'required',
        //     'email' => 'required|email|unique:users',
        //     'password' => 'required|min:6',
        //     'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg'
        // ]);
        if (Auth::check() && Auth::user()->tipo_usuario != 1) {
            return "esta logado e nao e admin";
        }

        $data = $request->except(["password", "image"]);
        $password = $request->input("password");
        $data["tipo_usuario"] = 0;
        $email = $request->input("email");
        if ($email == "adm@adm.com") {
            $data["tipo_usuario"] = 1;
        }
        $passwordHash = Hash::make($password);
        $data["password"] = $passwordHash;
        if ($request->hasFile("image")) {
            $data["image"] = $request->file('image')->store('image_profile', 'public');
        } else {
            $data["image"] = "image_profile/logo.svg";
        }
        $user = User::create($data);
        $token = $user->createToken('main')->plainTextToken;
        if ($email == "adm@adm.com") {
            app("App\Http\Controllers\LoginController")->authenticate($request);
            return response()->json([
                "status" => "success",
                "message" => "Usuario Administrador Criado e logado com sucesso!",
                "token" => $token,
            ]);
        }
        if (!Auth::check()) {
            app("App\Http\Controllers\LoginController")->authenticate($request);

            return response()->json([
                "status" => "success",
                "message" => "Usuario Criado e logado com sucesso!",
                "token" => $token,
            ]);
        }
        return response()->json([
            "status" => "success",
            "message" => "Usuario Criado com sucesso!",
            "token" => $token,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show()
    {
        $token = csrf_token();
        echo $token . "\n";
        $id = Auth::id();
        $usuario = User::all()->where('id_usuario', $id)->values();
        return $usuario;
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id_usuario)
    {
        $data = $request->except(["password", "image", "_method", "deletedImage"]);
        $password = $request->input("password");
        $passwordHash = Hash::make($password);
        $data["password"] = $passwordHash;
        if ($request->hasFile("image")) {
            $data["image"] = $request->file('image')->store('image_profile', 'public');
            // $deletedImage = $request->input("deletedImage");
            // if ($deletedImage !== "image_profile/logo.svg" || $deletedImage !== "image_profile/anonimo.png") {
            //     Storage::delete($request->input("deletedImage"));
            // }
        }
        User::where('id_usuario', $id_usuario)->update($data);
        $user = User::findOrFail($id_usuario);
        return response()->json([
            "status" => "success",
            "message" => "Usuario Atualizado com Sucesso!",
            "user" => $user,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id_usuario)
    {
        User::destroy($id_usuario);
        return response()->json([
            "status" => "success",
            "message" => "Usuario Deletado com Sucesso!",
        ]);
    }
    // public function login(Request $request)
    // {
    //     $dados = $request->only("email", "password");
    //     $credentials = $request->validate([
    //         "email" => ["required"],
    //         "password" => ["required"],
    //     ]);
    //     // echo $credentials["email"] . "\n";
    //     // echo $credentials["password"] . "\n";
    //     if (Auth::attempt($dados)) {
    //         $tipoUsuario = Auth::user()->tipo_usuario;
    //         if ($tipoUsuario === 0) {
    //             session(["tipo" => "comum"]);
    //         } elseif ($tipoUsuario === 1) {
    //             session(["tipo" => "administrador"]);
    //         }
    //         echo $tipoUsuario . "\n";
    //         return "Usuario Logado com Sucesso!";
    //     } else {
    //         return "Usuario ou senha incorretos!";
    //     }
    // }
    // public function logout(Request $request)
    // {
    //     Auth::logout();
    //     $request->session()->invalidate();
    //     $request->session()->regenerateToken();
    //     return "Usuario Deslogado!";
    //     // return redirect("/login");
    // }
    // public function telaLogin()
    // {
    //     $token = csrf_token();
    //     echo $token . "\n token telaLogin usuario conjtroller";
    //     return "Tela Login!";
    // }
    public function getUserById(string $is_usuario)
    {
        $usuario = User::all()->where('id_usuario', $is_usuario)->values();
        return $usuario;
    }
}
