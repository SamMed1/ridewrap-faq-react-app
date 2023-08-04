<?php

$auth = TEAMS_API_TOKEN;

$headers = array(
    'headers'     => array(
        'Authorization' => 'Bearer ' . $auth,
    ),
); 
$response = wp_remote_get( TEAMS_FAQ_RECORDS_API_ENDPOINT_PATH, $headers );
?>

<style>
.faq-react-app-listings {
    display: flex;
    flex-wrap: wrap;
}
.faq-react-app-listings .faq-react-app-listings-item {
    flex-basis: 100%;
    box-sizing: border-box;
    padding: 15px;
}
@media only screen and (min-width: 1300px) {
    .faq-react-app-listings .faq-react-app-listings-item {
        flex-basis: 50%;
    }
}
.faq-react-app-listings .faq-react-app-listings-item a {
    padding: 15px 20px;
    background: white;
    width: 100%;
    display: flex;
    text-decoration: none;
    justify-content: space-between;
}
.faq-react-app-listings .faq-react-app-listings-item a > * {
    width: 60%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.faq-react-app-listings .faq-react-app-listings-item span {
    justify-content: flex-start;
    line-height: 125%;
}
.faq-react-app-listings .faq-react-app-listings-item button {
    width: 35%;
    max-height: 40px;
    padding: 15px;
}
@media only screen and (min-width: 1300px) {
    .faq-react-app-listings .faq-react-app-listings-item button {
        width: 30%;
    }
}

</style>

<div class="container-negative">
    <div class="container">
        <div class="faq-react-app-listings">
            <?php
            if ( is_array( $response ) && ! is_wp_error( $response ) ) {
                $headers = $response['headers'];
                $body    = $response['body'];

                $obj = json_decode($body, TRUE);

                foreach( $obj as $key => $value ) {
                    $faq_title = $value['title'];
                    $faq_answer = $value['content'];

                    $a = trim(preg_replace('/\r|\n/', '', $faq_answer));
                    $b = str_replace('"', "'", $a);
                    $c = str_replace('.', ". ", $b);
                    ?>

                    <div class="faq-react-app-listings-item">
                        <a href="<?php echo esc_url( home_url( '/' ) ); ?>faq-listings?title=<?php echo $faq_title; ?>">
                            <span><?php echo $faq_title; ?></span>
                            <button>Go to FAQ</button>
                        </a>
                    </div>

                    <?php
                }
            }
            ?>
        </div>
    </div>
</div>

<?php return;
