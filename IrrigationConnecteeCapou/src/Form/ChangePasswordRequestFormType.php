<?php

namespace App\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\PasswordType;
use Symfony\Component\Form\Extension\Core\Type\RepeatedType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Validator\Constraints\Length;
use Symfony\Component\Validator\Constraints\NotBlank;

class ChangePasswordRequestFormType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
        ->add('oldPassword', PasswordType::class, [
            'attr' => array(
                'class' =>'input100 form-control',
                'placeholder' => 'Entrer votre mot de passe actuel'
            ),
            'constraints' => [
                new NotBlank([
                    'message' => 'Veuillez entrer votre mot de passe',
                ]),
            ],
            'label' => 'Mot de passe actuel',
        ])
        ->add('plainPassword', RepeatedType::class, [
            'type' => PasswordType::class,
            'first_options' => [
                'attr' => array(
                    'class' => 'input100 form-control',
                    'placeholder' => '6 caractères'
                ),
                'constraints' => [
                    new NotBlank([
                        'message' => 'Veuillez entrer le nouveau mot de passe',
                    ]),
                    new Length([
                        'min' => 6,
                        'minMessage' => 'Veuillez entrer au minimum {{ limit }} caractères',
                        // max length allowed by Symfony for security reasons
                        'max' => 4096,
                    ]),
                ],
                'label' => 'Nouveau mot de passe',
            ],
            'second_options' => [
                'attr' => array(
                //                         'autocomplete' => 'new-password',
                    'class' => 'input100 form-control',
                    'placeholder' => '6 caractères'
                ),
                'label' => 'Confirmer',
            ],
            'invalid_message' => 'Les deux mots de passe sont différents',
            // Instead of being set onto the object directly,
            // this is read and encoded in the controller
            'mapped' => true,
        ]);
    }
    
    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([]);
    }
}
