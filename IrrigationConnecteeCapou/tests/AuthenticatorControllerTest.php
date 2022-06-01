<?php

namespace App\Tests;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class AuthenticatorControllerTest extends WebTestCase
{
    public function testLoginForm()
    {
        $client = static::createClient();
        $crawler = $client->request('GET', '/login');
//         $csrfToken = $client->getContainer()->get('security.csrf.token_manager')->getToken('authenticate');
        
        $form = $crawler->selectButton('connexion')->form([
            'email' => 'admin@test.fr',
            'password' => 'fakePassword',
            '_csrf_token' => $client->getRequest('_csrf_token')
        ]);
        
        $client->submit($form);
//         $client->followRedirect();
        $this->assertResponseRedirects('/login');
//         $this->assertSelectorExists('.alert.alert-danger');
    }
}