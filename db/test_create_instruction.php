<?php
include('./conn.php');

$job_id = $_POST['job_id'];
$format_id = $_POST['format_id'];
$letters = $_POST['letters'];
$item_id = $_POST['item_id'];
$position_id = $_POST['position_id'];
$colour_id = $_POST['colour_id'];
$quantity = $_POST['quantity'];
$description = $_POST['description'];

$create_instruction = $db->prepare('INSERT INTO instruction
                                        (job_id,
                                        format_id,
                                        letters,
                                        item_id,
                                        colour_id,
                                        position_id,
                                        quantity,
                                        description)
                                    VALUES
                                    (:job_id,
                                        :format_id,
                                        :letters,
                                        :item_id,
                                        :colour_id,
                                        :position_id,
                                        :quantity,
                                        :description)
                                    ');

$create_instruction->execute([
    'job_id' => $job_id,
    'format_id' => $format_id,
    'letters' => $letters,
    'item_id' => $item_id,
    'colour_id' => $colour_id,
    'position_id' => $position_id,
    'quantity' => $quantity,
    'description' => $description,
]);

exit(json_encode($_POST))
?>