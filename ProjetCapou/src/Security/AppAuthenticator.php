<?php

namespace App\Security;

use App\Entity\User;
use Psr\Log\LoggerInterface;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Exception\AuthenticationException;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\Security\Http\Authenticator\AbstractLoginFormAuthenticator;
use Symfony\Component\Security\Http\Authenticator\Passport\Badge\CsrfTokenBadge;
use Symfony\Component\Security\Http\Authenticator\Passport\Badge\UserBadge;
use Symfony\Component\Security\Http\Authenticator\Passport\Credentials\PasswordCredentials;
use Symfony\Component\Security\Http\Authenticator\Passport\Passport;
use Symfony\Component\Security\Http\Util\TargetPathTrait;
use Symfony\Component\HttpFoundation\RequestStack;

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

        ['user_IP' => $userIP] = $this->getRouteNameAndUserIP();
        $userEmail = $this->getUserEmail($token);
        $this->logger->info("Un utilisateur anonyme ayant l'adresse IP '{$userIP}' vient de se connecter avec l'email '{$userEmail}'");
        
        $roles = array('ROLE_ADMIN', 'ROLE_TECHNICIAN');
        if($token->getUser()->getRoles() === $roles){
            return new RedirectResponse($this->urlGenerator->generate('app_admin'));
        }
        else{
            return new RedirectResponse($this->urlGenerator->generate('app_technician'));
        }
        //throw new \Exception('TODO: provide a valid redirect inside '.__FILE__);
    }
    
    public function onAuthenticationFailure(Request $request, AuthenticationException $exception): response
    {
        //dd($exception);
        if ($request->hasSession()) {
            $request->getSession()->set(Security::AUTHENTICATION_ERROR, $exception);
        }
        
        $url = $this->getLoginUrl($request);
        
        [
        'user_IP' => $userIP,
        'route_name' => $routeName
        ] = $this->getRouteNameAndUserIP();
        
        $this->logger->info("Un utilisateur anonyme ayant l'adresse IP '{$userIP}' a tenté d'accéder à la page: '{$routeName}'");
        
        return new RedirectResponse($url);
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
