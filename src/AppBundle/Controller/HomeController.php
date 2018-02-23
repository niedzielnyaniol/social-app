<?php

namespace AppBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use AppBundle\Form\LoginForm;

class HomeController extends Controller
{
    /**
     * @Route("/", name="homepage")
     */
    public function homeAction()
    {    
        return $this->render('home/homepage.html.twig');
    }
}