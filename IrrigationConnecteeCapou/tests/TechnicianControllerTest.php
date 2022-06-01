<?php

namespace App\Tests;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Session\Session;
use Symfony\Component\HttpFoundation\Session\Storage\MockArraySessionStorage;
use Symfony\Component\HttpFoundation\RequestStack;

class TechnicianControllerTest extends WebTestCase
{
    public function testDisplayLoginForm(): void
    {
        $client = static::createClient();
        $client->request('GET', '/technician');
        
        $this->assertResponseRedirects('/login');
    }
    
//     public function testDisplayTechnicianInterface(): void
//     {
//         $client = static::createClient();
        
//         $request = new Request();
//         $request->setSession(new Session(new MockArraySessionStorage()));
        
//         $client->getContainer()->get(RequestStack::class)->push($request);
                
// //         $client->request('POST', '/login', [
// //             '_csrf_token' => $csrfToken,
// //             'email' => 'sarahbarrabe@gmail.com',
// //             'password' => 'technician',
// //         ]);
        
//                 $crawler = $client->request('GET', '/login');
                 
//                 $form = $crawler->selectButton('connexion')->form([
//                     '_csrf_token' => $client->getContainer()->get('security.csrf.token_manager')->refreshToken('authenticate'),
//                     'email' => 'sarahbarrabe@gmail.com',
//                     'password' => 'technician'
//                 ]);
//                 $client->submit($form);
//                 $client->followRedirect();
//                 $this->assertResponseRedirects('/login');
//                 $this->assertSelectorExists('.alert.alert-danger');
//         //         $this->assertResponseStatusCodeSame(Response::HTTP_UNAUTHORIZED);
//     }    
}
