@component('mail::message')
    Titulo: **{{ $titulo }}**, {{-- use double space for line break --}}
    {{ $mensagem }}
@endcomponent
