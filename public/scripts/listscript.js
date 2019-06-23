function EditMode(id){
    var uniqueid=id[8];
    $("#Save"+uniqueid).show();
    $("#listname"+uniqueid).prop('disabled', false);
    $("#"+id).hide();
}


function ModifyListname(id)
    {
       
        var listid=id[4];
        var title=$("#listname"+listid).val();

        if(title == "")
        {
            $("#emptyinputsAlert").show().delay(200).addClass("in").fadeOut(1000);
            event.preventDefault();
            return false;
        }
        var listmodified={
            id:listid,
            title:title,
            username:$("#username").text()
        }

        $("#Save"+listid).hide();
        $("#EditMode"+listid).show();
        $("#listname"+listid).prop('disabled', true);

        $.ajax({
            method: "POST",
            url: "/lists/modifylist",
            data: listmodified, 
            success: function(resp) {
            }
            }); 

        event.preventDefault();
      
      return false;
    }

    function DeleteList(id)
    {
        var listid= $("#"+id).parent().parent().parent().attr('id');
        
        $("#"+id).parent().parent().parent().remove();

            var deletedlist={
                id:listid,
                username:$("#username").text()
            }
            listcounter=listcounter-1;
            listnumber=listnumber-1;

            $.ajax({
            method: "POST",
            url: "/lists/deletelist",
            data: deletedlist,
            });  
            
        var listid={
            id:listid,
            username:$("#username").text()
        }
            $.ajax(
                { url: "/tasks/deletetaskbylist", 
                method: "POST", 
                data: listid ,
                success: function(resp) {
                }
         }); 
            
        return false;
    }
    $(document).ready(function () {

        $("#AddList").click(function () {

            if(listnumber >=2 && $("#type").text()=="N")
            {
                $("#limitAlert").show().delay(200).addClass("in").fadeOut(1000);
                return false;
            }
        
            var list=$("#list").clone(true);
            list.attr('id',listcounter.toString());
            list.children(".card").children(".card-header").children(".fa-plus").attr('id',"AddTask"+listcounter.toString());
            list.children(".card").children(".card-header").children(".fa-remove").attr('id',"DeleteList"+listcounter.toString());
            list.children(".card").children(".card-header").children(".fa-edit").attr('id',"EditMode"+listcounter.toString());
            list.children(".card").children(".card-header").children(".form-inline").children(".btn").attr('id',"Save"+listcounter.toString());
            list.children(".card").children(".card-header").children(".form-inline").children(".form-control").attr('id',"listname"+listcounter.toString());
            list.appendTo("#AllListsContainer");

            $("#Save"+listcounter.toString()).show();
            $("#listname"+listcounter.toString()).prop('disabled', false);
            $("#EditMode"+listcounter.toString()).hide();
    
            var listcreated={
                id:listcounter,
                title:"",
                username:$("#username").text()
            }
            listnumber++;
            listcounter++;
            
            var responseAddlist={};
            $.ajax({
            method: "POST",
            url: "/lists/addlist",
            data: listcreated,
            success: function(resp) {
                responseAddlist=resp;
            }
            });   
            return false;
    
        });

});