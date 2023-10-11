<?php
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Factory as ValidationFactory;

class LoginRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'nome' => 'required',
            'senha' => 'required'
        ];
    }

    /**
     * Get the needed authorization credentials from the request.
     *
     * @return array
     * @throws \Illuminate\Contracts\Container\BindingResolutionException
     */
    public function getCredentials()
    {
        // The form field for providing nome or senha
        // have name of "nome", however, in order to support
        // logging users in with both (nome and email)
        // we have to check if user has entered one or another
        $nome = $this->get('nome');

        if ($this->isEmail($nome)) {
            return [
                'email' => $nome,
                'senha' => $this->get('senha')
            ];
        }

        return $this->only('nome', 'senha');
    }

    /**
     * Validate if provided parameter is valid email.
     *
     * @param $param
     * @return bool
     * @throws \Illuminate\Contracts\Container\BindingResolutionException
     */
    private function isEmail($param)
    {
        $factory = $this->container->make(ValidationFactory::class);

        return !$factory->make(
            ['nome' => $param],
            ['nome' => 'email']
        )->fails();
    }
}