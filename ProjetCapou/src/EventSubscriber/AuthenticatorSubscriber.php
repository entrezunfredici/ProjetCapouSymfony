<?php

// //namespace App\EventSubscriber;
// //namespace App\Security;

// use Symfony\Component\EventDispatcher\EventSubscriberInterface;
// use Symfony\Component\Security\Core\Event\AuthenticationSuccessEvent;
// use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
// use Psr\Log\LoggerInterface;
// use Symfony\Component\HttpFoundation\RequestStack;
// use Symfony\Component\Security\Http\SecurityEvents;
// use Symfony\Component\Security\Http\Event\InteractiveLoginEvent;
// use Symfony\Component\Security\Http\Event\LogoutEvent;
// use App\Entity\User;

// // use Symfony\Component\Security\Core\AuthenticationEvents;
// // use Symfony\Component\Security\Core\Event\AuthenticationEvent;
// // use Symfony\Component\HttpFoundation\Request;
// // use Symfony\Component\HttpFoundation\Response;
// // use Symfony\Component\Security\Core\Exception\AuthenticationException;


// class AuthenticatorSubscriber implements EventSubscriberInterface
// {
    
//     private LoggerInterface $securityLogger;
//     private RequestStack $requestStack;
//     private AuthenticationSuccessEvent $event;
    
//     public function __construct(LoggerInterface $securityLogger, RequestStack $requestStack, AuthenticationSuccessEvent $event)
//     {
//         $this->securityLogger = $securityLogger;
//         $this->requestStack = $requestStack;
//         $this->event = $event;
//     }
    
//     /** @return array<string> */
//     public static function getSubscribedEvents()
//     {
//         return [
//             //'security.authentication.success' => 'onSecurityAuthenticationSuccess',
//             ////AuthenticationException::AUTHENTICATION_ERROR => 'onAuthenticationFailure',
//             //AuthenticationEvent::AUTHENTICATION_FAILURE => 'onAuthenticationFailure',
//             AuthenticationSuccessEvent::AUTHENTICATION_SUCCESS      => 'onAuthenticationSuccess',
//             SecurityEvents::INTERACTIVE_LOGIN                       => 'onSecurityInteractiveLogin',
//             'Symfony\Component\Security\Http\Event\LogoutEvent'     => 'onSecurityLogout'
//         ];
//     }
    
//     public function onSecurityAuthenticationSuccess(AuthenticationSuccessEvent $event): void
//     {
        
//         [
//             'user_IP' => $userIP,
//             'route_name' => $routeName
//         ] = $this->getRouteNameAndUserIP();
        
        
//         if(empty($this->event->getAuthenticationToken()->getRoleNames())){
//             $this->securityLogger->info("Un utilisateur anonyme ayant l'adresse IP '{$userIP}' vient d'accèder à la page: '{$routeName}' ");
//         }
//         else {
//             /** @var TokenInterface $securityToken */
//             $securityToken = $this->event->getAuthenticationToken();
//             $userEmail = $this->getUserEmail($securityToken);
            
//             $this->securityLogger->info("Un utilisateur anonyme ayant l'adresse IP '{$userIP}' vient de se connecter avec l'email '{$userEmail}'");
//         }
//     }
    
    
//     //     public function onAuthenticationFailure(Request $request, AuthenticationException $exception): response
//     //     {
//     //         dd($exception);
//     //     }
    
//     public function onSecurityInteractiveLogin(InteractiveLoginEvent $event): void
//     {
//         ['user_IP' => $userIP] = $this->getRouteNameAndUserIP();
        
//         /** @var TokenInterface $securityToken */
//         $securityToken = $event->getAuthenticationToken();
        
//         $userEmail = $this->getUserEmail($securityToken);
        
//         $this->securityLogger->info("Un utilisateur anonyme ayant l'adresse IP '{$userIP}' vient de se connecter avec l'email '{$userEmail}'");
//     }
    
//     public function onSecurityLogout(LogoutEvent $event): void
//     {
//         /** @var RedirectResponse|null $response*/
//         $response = $event->getResponse();
        
//         /** @var TokenInterface $securityToken */
//         $securityToken = $this->event->getToken();
        
//         if(!$response || !$securityToken){
//             return;
//         }
        
//         ['user_IP' => $userIP] = $this->getRouteNameAndUserIP();
//         $userEmail = $this->getUserEmail($securityToken);
//         $targetUrl = $response->getTargetUrl();
//         $this->securityLogger->info("L'utilisateur ayant l'adresse IP '{$userIP}' et l'email '{$userEmail}' s'est déconecté et a été redirigé vers l'url suivante: '{$targetUrl}'");
        
//     }
    
//     /**
//      * Return the user IP and the name of the route where the user has arrived.
//      *
//      * @return array{user_IP: string|null, route_name: mixed}
//      */
//     public function getRouteNameAndUserIP(): array
//     {
//         $request = $this->requestStack->getCurrentRequest();
        
//         if(!request){
//             return [
//                 'user_IP' => 'Inconnue',
//                 'route_name' => 'Inconnue'
//             ];
//         }
        
//         return [
//             'user_IP' => $request->getClientIp() ?? 'Inconnue',
//             'route_name' => $request->attributes->get('_route')
//         ];
//     }
    
//     private function getUserEmail(TokenInterface $securityToken): string
//     {
//         /** @var User $user*/
//         $user = $securityToken->getUser();
//         return $user->getEmail();
//     }
    
    
// }