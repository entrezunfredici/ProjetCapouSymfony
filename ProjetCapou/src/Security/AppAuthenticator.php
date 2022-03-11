<?php

namespace App\Security;

use App\Entity\User;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
//use Symfony\Component\Security\Core\Security;
use Symfony\Component\Security\Http\Authenticator\AbstractLoginFormAuthenticator;
use Symfony\Component\Security\Http\Authenticator\Passport\Badge\CsrfTokenBadge;
use Symfony\Component\Security\Http\Authenticator\Passport\Badge\UserBadge;
use Symfony\Component\Security\Http\Authenticator\Passport\Credentials\PasswordCredentials;
use Symfony\Component\Security\Http\Authenticator\Passport\Passport;
use Symfony\Component\Security\Http\Util\TargetPathTrait;
use Symfony\Component\Security\Core\Security;
use Psr\Log\LoggerInterface;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\Security\Http\Event\InteractiveLoginEvent;

class AppAuthenticator extends AbstractLoginFormAuthenticator
{
    use TargetPathTrait;

    public const LOGIN_ROUTE = 'app_login';

    private UrlGeneratorInterface $urlGenerator;
    private LoggerInterface $logger;
    private RequestStack $requestStack;

    public function __construct(UrlGeneratorInterface $urlGenerator, LoggerInterface $logger, RequestStack $requestStack)
    {
        $this->urlGenerator = $urlGenerator;
        $this->logger = $logger;
        $this->requestStack = $requestStack;
    }

    public function authenticate(Request $request): Passport
    {
        $email = $request->request->get('email', '');

        $request->getSession()->set(Security::LAST_USERNAME, $email);

        return new Passport(
            new UserBadge($email),
            new PasswordCredentials($request->request->get('password', '')),
            [
                new CsrfTokenBadge('authenticate', $request->request->get('_csrf_token')),
            ]
        );
    }

    public function onAuthenticationSuccess(Request $request, TokenInterface $token, string $firewallName): ?Response
    {
        if ($targetPath = $this->getTargetPath($request->getSession(), $firewallName)) {
            return new RedirectResponse($targetPath);
        }
        
        $this->logger->info('teeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeest');
        [
            'user_IP' => $userIP,
            'route_name' => $routeName
        ] = $this->getRouteNameAndUserIP();


//         if(empty($this->getAuthenticationToken()->getRoleNames())){
//             $this->logger->info("Un utilisateur anonyme ayant l'adresse IP '{$userIP}' vient d'accèder à la page: '{$routeName}' ");
//         }
//         else {
// //             /** @var TokenInterface $securityToken */
// //             $securityToken = $this->event->getAuthenticationToken();
// //             $userEmail = $this->getUserEmail($securityToken);
//             $this->logger->info("Un utilisateur anonyme vient d'accèder à la page ");
            
// //             $this->logger->info("Un utilisateur anonyme ayant l'adresse IP '{$userIP}' vient de se connecter avec l'email '{$userEmail}'");
//         }

        //$this->logger->info("Un utilisateur anonyme ayant l'adresse IP '{$userIP}' vient d'accèder à la page: '{$routeName}' ");
        
        
        /** @var User $user*/
        //$user = $token->getUser();
        //return $user->getEmail();
        
        $userEmail = $user->getEmail();
        
        $this->logger->info("Un utilisateur anonyme ayant l'adresse IP '{$userIP}' vient de se connecter avec l'email '{$userEmail}'");
        
        
        // For example:
        //return new RedirectResponse($this->urlGenerator->generate('some_route'));
        //throw new \Exception('TODO: provide a valid redirect inside '.__FILE__);
        return new RedirectResponse($this->urlGenerator->generate('home'));
        
  
    }

    public function onSecurityInteractiveLogin(InteractiveLoginEvent $event): void
    {
        ['user_IP' => $userIP] = $this->getRouteNameAndUserIP();

        /** @var TokenInterface $securityToken */
        $securityToken = $event->getAuthenticationToken();

        $userEmail = $this->getUserEmail($securityToken);

        $this->logger->info("Un utilisateur anonyme ayant l'adresse IP '{$userIP}' vient de se connecter avec l'email '{$userEmail}'");
    }

    protected function getLoginUrl(Request $request): string
    {
        return $this->urlGenerator->generate(self::LOGIN_ROUTE);
    }
    
    
    /**
     * Return the user IP and the name of the route where the user has arrived.
     *
     * @return array{user_IP: string|null, route_name: mixed}
     */
    private function getRouteNameAndUserIP(): array
    {
        $request = $this->requestStack->getCurrentRequest();

//         if(!request){
//             return [
//                 'user_IP' => 'Inconnue',
//                 'route_name' => 'Inconnue'
//             ];
//         }

        return [
            'user_IP' => $request->getClientIp() ?? 'Inconnue',
            'route_name' => $request->attributes->get('_route')
        ];
    }

    private function getUserEmail(TokenInterface $securityToken): string
    {
        /** @var User $user*/
        $user = $securityToken->getUser();
        return $user->getEmail();
    }
}
