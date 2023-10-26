<?php
namespace App\Http\Controllers;


use GuzzleHttp\Client;
use Illuminate\Http\Request;



class ChatController extends Controller
{
    public function chat(Request $request)
    {
        $client = new Client([
            'base_uri' => 'https://api.openai.com/v1/chat/completions',
            'verify' => false
        ]);
        $response = $client->post('https://api.openai.com/v1/chat/completions', [
            'headers' => [
                'Content-Type' => 'application/json',
                'Authorization' => 'Bearer ' . env('OPENAI_API_KEY'),
            ],
            'json' => [
                "model" => "gpt-3.5-turbo",
                'messages' => [["role" => "user", "content" => 'Crie uma mensagem de conselho e ajuda para a vitima que sofreu o seguinte bullying: ("' . $request->input('message') . '").']],
                'temperature' => 0.7,
                'max_tokens' => 60,
            ],
        ]);
        $result = json_decode($response->getBody()->getContents(), true);
        $responseString = response()->json($result['choices'][0]['message']['content']);
        /* $formatedResult = str_replace('\n', '', $responseString);
        $formatedResult = preg_replace('/[^":\w\s]+/', '', $formatedResult); */
        return $responseString;
    }


    private function sendApiRequest(string $denuncia)
    {
        $client = new Client([
            'base_uri' => 'https://api.openai.com/v1/chat/completions',
            'verify' => false
        ]);

        $response = $client->post('https://api.openai.com/v1/chat/completions', [
            'headers' => [
                'Content-Type' => 'application/json',
                'Authorization' => 'Bearer ' . env('OPENAI_API_KEY'),
            ],
            'json' => [
                "model" => "gpt-3.5-turbo",
                'messages' => [["role" => "user", "content" => 'Crie uma mensagem de conselho e ajuda para a vitima que sofreu o seguinte bullying: ("' . $denuncia . '").']],
                'temperature' => 0.7,
            ],
        ]);
        $result = json_decode($response->getBody()->getContents(), true);
        $responseString = response()->json($result['choices'][0]['message']['content']);
        $responseString = str_replace(array('[', ']', "'"), '', $responseString);
        $responseString = str_replace('\u00e3', 'ã', $responseString);
        $responseString = str_replace('\u00e7', 'ç', $responseString);
        $responseString = str_replace('\u00ed', 'i', $responseString);
        $responseString = str_replace('\u00e9', 'e', $responseString);
        $responseString = str_replace('\u00ea', 'e', $responseString);
        $responseString = str_replace('\u00e1', 'a', $responseString);
        $responseString = str_replace('\u00f3', 'o', $responseString);
        $responseString = str_replace('\u00c9', 'é', $responseString);
        $responseString = str_replace('\u00f5', 'õ', $responseString);
        $responseString = str_replace('\u00fa', 'u', $responseString);
        $responseString = str_replace('\u00e0', 'á', $responseString);
        $responseString = str_replace('\n', '', $responseString);
        return $responseString;
    }

    public function getConselho(string $denuncia)
    {
        return $this->sendApiRequest('Denuncia', $denuncia);
    }

}