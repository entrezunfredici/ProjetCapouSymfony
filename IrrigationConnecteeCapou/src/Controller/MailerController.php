<?php

namespace App\Controller;

use App\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Mailer\Mailer;
use Symfony\Component\Mailer\Transport;
use Symfony\Component\Mime\Address;
use Symfony\Component\Mime\Email;
use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Component\Mime\RawMessage;
use SymfonyCasts\Bundle\ResetPassword\Model\ResetPasswordToken;
use Symfony\Component\Mailer\MailerInterface;

class MailerController extends AbstractController
{
    private $mailer;
    
    public function __construct(MailerInterface $mailer)
    {
        $this->mailer = $mailer;
    }
    
    public function emailSend(RawMessage $email)
    {
        $transport = Transport::fromDsn('gmail://AddrTest666@gmail.com:Q5qcd9yNbuE7D3m@default');
        $this->mailer = new Mailer($transport);
        $this->mailer->send($email);
    }
    
    public function emailRegistration(User $user): RawMessage
    {       
        $email = (new TemplatedEmail())
            ->from(new Address('AddrTest666@gmail.com', 'no-reply-registration'))
            ->to($user->getEmail())
            ->subject('Inscription Irrigation Connectée')
            ->htmlTemplate('registration/email.html.twig')
            ->context([
                'identifiant' => $user->getEmail(),
                'mdp'=> $user->getPlainPassword(),
            ]);;
                        
        return $email;
    }
    
    public function emailResetPassword(User $user, ResetPasswordToken $resetToken, string $url): RawMessage
    {
        $email = (new TemplatedEmail())
            ->from(new Address('AddrTest666@gmail.com', 'no-reply-reset-password'))
            ->to($user->getEmail())
            ->subject('Oubli de mot de passe')
            ->htmlTemplate('reset_password/email.html.twig')
            ->context([
                'url'=> $url
            ]);
            
        return $email;
    } 
}
