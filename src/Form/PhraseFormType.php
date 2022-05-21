<?php

namespace App\Form;

use App\Entity\Phrase;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;

class PhraseFormType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
        ->add('category', ChoiceType::class, [
            'choices'  => [
                'chat' => 'chat',
                'mail' => 'mail',
                'divers' => 'divers',
            ],
            'choice_attr' => function($choice, $key, $value) {
                // adds a class like attending_yes, attending_no, etc
                return ['class' => 'category'];
            },
            'expanded' => true,
          'multiple' => false,
        ])
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Phrase::class,
            "allow_extra_fields" => true
        ]);
    }
}
